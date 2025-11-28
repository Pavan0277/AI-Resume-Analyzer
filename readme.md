# 📄 AI Resume Analyzer

An AI-powered web application that analyzes resumes and provides comprehensive feedback including skill extraction, job role suggestions, ATS compatibility scores, and actionable improvement recommendations.

![AI Resume Analyzer](https://img.shields.io/badge/AI-Resume%20Analyzer-indigo?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--5.1-412991?style=flat-square&logo=openai)

---

## 🌟 Overview

AI Resume Analyzer is a full-stack application that helps job seekers improve their resumes using artificial intelligence. Simply upload your resume (PDF or TXT) or paste the text, and get instant, detailed feedback.

### ✨ Key Features

-   **📊 Overall Resume Score** - Get a score out of 100 based on multiple criteria
-   **🎯 Skill Detection** - Automatically extracts and highlights your key skills
-   **💼 Job Role Suggestions** - AI recommends suitable job positions based on your profile
-   **🤖 ATS Compatibility Check** - See how well your resume performs with Applicant Tracking Systems
-   **📈 Score Comparison** - Compare your scores against industry averages
-   **🔍 Job Match Analysis** - Paste a job description to see how well your resume matches
-   **📥 Export Options** - Download reports as PDF, TXT, or JSON
-   **🔗 Share Results** - Share your analysis on social media
-   **📜 History Tracking** - View and reload past analyses
-   **🌙 Dark Mode** - Toggle between light and dark themes
-   **⚡ Auto-Analyze** - Drop a file and analysis starts automatically

---

## 🛠️ Tech Stack

### Frontend

| Technology   | Version | Purpose                 |
| ------------ | ------- | ----------------------- |
| React        | 19.2.0  | UI Framework            |
| Vite         | 7.2.4   | Build Tool & Dev Server |
| Tailwind CSS | 4.1.17  | Styling                 |
| Axios        | 1.13.2  | HTTP Client             |

### Backend

| Technology       | Version | Purpose              |
| ---------------- | ------- | -------------------- |
| Node.js          | 22.x    | Runtime Environment  |
| Express          | 5.1.0   | Web Framework        |
| MongoDB/Mongoose | 9.0.0   | Database & ODM       |
| OpenAI API       | 6.9.1   | AI Analysis          |
| Multer           | 2.0.2   | File Upload Handling |
| pdf-parse        | 1.1.1   | PDF Text Extraction  |

---

## 📁 Project Structure

```
AI-Resume-Analyzer/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── resumeController.js # Resume analysis logic
│   ├── models/
│   │   └── Resume.js          # Mongoose schema
│   ├── routes/
│   │   └── resumeRoutes.js    # API routes
│   ├── uploads/               # Temporary file storage
│   ├── app.js                 # Express app config
│   ├── index.js               # Server entry point
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ATSChecker.jsx
│   │   │   ├── ComparisonChart.jsx
│   │   │   ├── ExportButton.jsx
│   │   │   ├── KeywordMatcher.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── ResumeHistory.jsx
│   │   │   ├── ResumePreview.jsx
│   │   │   ├── ScoreBar.jsx
│   │   │   ├── ScoreCircle.jsx
│   │   │   ├── ShareButton.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── SkillBadge.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── UploadPage.jsx
│   │   │   └── AnalysisPage.jsx
│   │   ├── constant/
│   │   │   └── constants.js   # API base URL
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

---

## 🚀 Setup Instructions

### Prerequisites

-   **Node.js** (v18 or higher)
-   **npm** or **yarn**
-   **MongoDB Atlas** account (or local MongoDB)
-   **OpenAI API** key

### 1. Clone the Repository

```bash
git clone https://github.com/Pavan0277/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your credentials (see .env sample below)

# Start the server
npm run dev     # Development with nodemon
# or
npm start       # Production
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Access the Application

Open your browser and navigate to `http://localhost:5173`

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory:

### `.env` Sample

```env
# Server Configuration
PORT=5000

# MongoDB Connection
# Use either MONGO_URI or MONGODB_URI (both are supported)
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ai-resume-analyzer?retryWrites=true&w=majority

# OpenAI API
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Optional: Node Environment
NODE_ENV=development
```

### Getting API Keys

1. **MongoDB Atlas**

    - Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
    - Create a new cluster
    - Get your connection string from "Connect" → "Connect your application"

2. **OpenAI API**
    - Create an account at [platform.openai.com](https://platform.openai.com)
    - Navigate to API Keys section
    - Generate a new secret key

---

## 📝 API Endpoints

| Method | Endpoint       | Description                            |
| ------ | -------------- | -------------------------------------- |
| POST   | `/api/analyze` | Analyze a resume (file upload or text) |
| GET    | `/api/health`  | Health check endpoint                  |

### Request Example

```bash
# Upload a PDF file
curl -X POST http://localhost:5000/api/analyze \
  -F "resume=@/path/to/resume.pdf"

# Or send text directly
curl -X POST http://localhost:5000/api/analyze \
  -F "text=Your resume content here..."
```

### Response Example

```json
{
    "overall_score": 75,
    "summary": "Your resume demonstrates strong technical skills...",
    "skills": ["JavaScript", "React", "Node.js", "MongoDB"],
    "suggested_roles": ["Full Stack Developer", "Frontend Engineer"],
    "category_scores": {
        "readability": 8,
        "technical": 7,
        "buzzwords": 6,
        "teamwork": 7,
        "leadership": 5,
        "communication": 8
    },
    "improvement_areas": [
        "Add more quantifiable achievements",
        "Include relevant certifications"
    ],
    "resume_data": {
        "name": "John Doe",
        "email": "john@example.com",
        "location": "New York, NY"
    }
}
```

---

## 🖥️ Screenshots

### Upload Page

-   Drag & drop or click to upload resume
-   Paste resume text directly
-   Auto-analyze on file drop

### Analysis Dashboard

-   Overall score with visual indicator
-   Category-wise score breakdown
-   Skills and job role suggestions
-   Improvement recommendations

### Additional Features

-   ATS compatibility checker
-   Job description matcher
-   Export and share options
-   Dark mode support
