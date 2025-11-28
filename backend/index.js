import { config } from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

config();

const port = process.env.PORT || 5000;

// Connect to Database
connectDB();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
