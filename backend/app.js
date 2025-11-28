import express, { json } from "express";
import cors from "cors";
import resumeRoutes from "./routes/resumeRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use("/api", resumeRoutes);

export default app;
