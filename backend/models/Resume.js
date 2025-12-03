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

// Add indexes for efficient filtering and sorting
ResumeSchema.index({ "aiSummary.skills": 1 });
ResumeSchema.index({ "aiSummary.suggested_roles": 1 });
ResumeSchema.index({ "aiSummary.overall_score": -1 });
ResumeSchema.index({ createdAt: -1 });

export default mongoose.model("Resume", ResumeSchema);
