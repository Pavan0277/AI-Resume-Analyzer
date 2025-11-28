import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
    name: String,
    email: String,
    resumeText: String,
    aiSummary: {
        overall_score: Number,
        summary: String,
        skills: [String],
        suggested_roles: [String],
        category_scores: {
            readability: Number,
            technical: Number,
            buzzwords: Number,
            teamwork: Number,
            leadership: Number,
            communication: Number,
            points_gained: Number,
        },
        improvement_areas: [String],
        resume_data: mongoose.Schema.Types.Mixed,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Resume", ResumeSchema);
