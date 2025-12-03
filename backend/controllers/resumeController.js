import OpenAI from "openai";
import { readFileSync, unlinkSync } from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
import Resume from "../models/Resume.js";
import { config } from "dotenv";

config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Helper to parse PDF
const parsePdf = async (filePath) => {
    const dataBuffer = readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
};

export const analyzeResume = async (req, res) => {
    try {
        let resumeText = "";

        if (req.file) {
            if (req.file.mimetype === "application/pdf") {
                resumeText = await parsePdf(req.file.path);
            } else {
                resumeText = readFileSync(req.file.path, "utf8");
            }
            // Clean up uploaded file
            unlinkSync(req.file.path);
        } else if (req.body.text) {
            resumeText = req.body.text;
        } else {
            return res.status(400).json({ error: "No resume provided" });
        }

        if (!resumeText.trim()) {
            return res.status(400).json({ error: "Resume text is empty" });
        }

        // Call OpenAI
        const prompt = `Analyze the following resume text comprehensively and provide a detailed analysis in JSON format.

Resume Text: "${resumeText.substring(0, 15000)}"

Provide a comprehensive analysis with the following structure:
{
    "overall_score": <number between 0-100 based on resume quality>,
    "summary": "<2-3 sentence professional summary>",
    "skills": ["<skill1>", "<skill2>", ...],
    "suggested_roles": ["<role1>", "<role2>"],
    "category_scores": {
        "readability": <score 1-10>,
        "technical": <score 1-10>,
        "buzzwords": <score 1-10>,
        "teamwork": <score 1-10 or null if not applicable>,
        "leadership": <score 1-10 or null if not applicable>,
        "communication": <score 1-10>,
        "points_gained": <number>
    },
    "improvement_areas": ["<specific improvement suggestion 1>", "<specific improvement suggestion 2>", ...],
    "resume_data": {
        "name": "<extracted name or 'Unknown'>",
        "email": "<extracted email or ''>",
        "location": "<extracted location or ''>",
        "linkedin": "<extracted linkedin url or ''>",
        "github": "<extracted github url or ''>",
        "portfolio": "<extracted portfolio url or ''>",
        "education": [
            {
                "institution": "<school name>",
                "degree": "<degree title>",
                "gpa": "<gpa if mentioned>",
                "duration": "<date range>",
                "location": "<location>"
            }
        ],
        "experience": [
            {
                "title": "<job title at company>",
                "technologies": "<comma separated technologies>",
                "duration": "<date range>",
                "achievements": ["<achievement 1>", "<achievement 2>"]
            }
        ],
        "projects": [
            {
                "name": "<project name>",
                "link": "<project url if any>",
                "technologies": "<comma separated technologies>",
                "highlights": ["<highlight 1>", "<highlight 2>"]
            }
        ]
    }
}

Be thorough but realistic with scoring. Respond ONLY with valid JSON.`;

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-5.1",
            response_format: { type: "json_object" },
        });

        const aiResponse = JSON.parse(completion.choices[0].message.content);

        // Save to DB
        const newResume = new Resume({
            name: req.body.name || "Anonymous",
            email: req.body.email || "",
            resumeText: resumeText,
            aiSummary: aiResponse,
        });

        await newResume.save();

        res.json(aiResponse);
    } catch (error) {
        console.error("Error analyzing resume:", error);
        res.status(500).json({ error: "Failed to analyze resume" });
    }
};

// Get resume history with pagination and filters
export const getResumeHistory = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            skills,
            suggested_roles,
            minScore,
            maxScore,
            sortBy = "createdAt",
            sortOrder = "desc",
        } = req.query;

        // Build filter query
        const filter = {};

        if (skills) {
            const skillsArray = skills.split(",").map((s) => s.trim());
            filter["aiSummary.skills"] = {
                $in: skillsArray.map((s) => new RegExp(s, "i")),
            };
        }

        if (suggested_roles) {
            const rolesArray = suggested_roles.split(",").map((r) => r.trim());
            filter["aiSummary.suggested_roles"] = {
                $in: rolesArray.map((r) => new RegExp(r, "i")),
            };
        }

        if (minScore || maxScore) {
            filter["aiSummary.overall_score"] = {};
            if (minScore)
                filter["aiSummary.overall_score"].$gte = Number(minScore);
            if (maxScore)
                filter["aiSummary.overall_score"].$lte = Number(maxScore);
        }

        // Calculate pagination
        const skip = (Number(page) - 1) * Number(limit);

        // Build sort object
        const sort = {};
        sort[sortBy === "score" ? "aiSummary.overall_score" : sortBy] =
            sortOrder === "asc" ? 1 : -1;

        // Execute query
        const [resumes, total] = await Promise.all([
            Resume.find(filter)
                .select("-resumeText") // Exclude large text field
                .sort(sort)
                .skip(skip)
                .limit(Number(limit))
                .lean(),
            Resume.countDocuments(filter),
        ]);

        res.json({
            resumes,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(total / Number(limit)),
                totalItems: total,
                itemsPerPage: Number(limit),
                hasNext: skip + resumes.length < total,
                hasPrev: Number(page) > 1,
            },
        });
    } catch (error) {
        console.error("Error fetching resume history:", error);
        res.status(500).json({ error: "Failed to fetch resume history" });
    }
};

// Get single resume by ID
export const getResumeById = async (req, res) => {
    try {
        const { id } = req.params;

        const resume = await Resume.findById(id).lean();

        if (!resume) {
            return res.status(404).json({ error: "Resume not found" });
        }

        res.json(resume);
    } catch (error) {
        console.error("Error fetching resume:", error);
        res.status(500).json({ error: "Failed to fetch resume" });
    }
};

// Get filter options (unique skills and roles)
export const getFilterOptions = async (req, res) => {
    try {
        const [skills, roles] = await Promise.all([
            Resume.distinct("aiSummary.skills"),
            Resume.distinct("aiSummary.suggested_roles"),
        ]);

        res.json({
            skills: skills.filter(Boolean).sort(),
            suggested_roles: roles.filter(Boolean).sort(),
        });
    } catch (error) {
        console.error("Error fetching filter options:", error);
        res.status(500).json({ error: "Failed to fetch filter options" });
    }
};
