import express, { json } from "express";
import cors from "cors";
import resumeRoutes from "./routes/resumeRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use("/api", resumeRoutes);

app.get("/", (req, res) => {
    res.send("Resume Analysis API is running");
});

export default app;
