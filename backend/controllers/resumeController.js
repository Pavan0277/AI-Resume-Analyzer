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
