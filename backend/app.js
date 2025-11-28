import express, { json } from "express";
import cors from "cors";
import resumeRoutes from "./routes/resumeRoutes.js";

const app = express();

// Middleware
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(cors({
    origin: corsOrigin,
}));

app.use(json());

// Routes
app.use("/api", resumeRoutes);

app.get("/", (req, res) => {
    res.send("Resume Analysis API is running");
});

export default app;
