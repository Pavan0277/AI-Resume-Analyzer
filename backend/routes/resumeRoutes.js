import { Router } from "express";
import multer from "multer";
import {
    analyzeResume,
    getResumeHistory,
    getResumeById,
    getFilterOptions,
} from "../controllers/resumeController.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

// Analyze resume
router.post("/analyze", upload.single("resume"), analyzeResume);

// Get resume history with filters and pagination
router.get("/history", getResumeHistory);

// Get single resume by ID
router.get("/history/:id", getResumeById);

// Get filter options (available skills and roles)
router.get("/filter-options", getFilterOptions);

export default router;
