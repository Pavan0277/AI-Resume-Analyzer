import React, { useState } from "react";

const ExportButton = ({ result }) => {
    const [isExporting, setIsExporting] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const generateTextReport = () => {
        const {
            overall_score = 0,
            summary = "",
            skills = [],
            suggested_roles = [],
            improvement_areas = [],
            category_scores = {},
            resume_data = {},
        } = result || {};

        const report = `
═══════════════════════════════════════════════════════════════
                    AI RESUME ANALYSIS REPORT
═══════════════════════════════════════════════════════════════

Generated: ${new Date().toLocaleString()}

───────────────────────────────────────────────────────────────
                         OVERALL SCORE
───────────────────────────────────────────────────────────────

Score: ${overall_score}/100

${summary}

───────────────────────────────────────────────────────────────
                       CATEGORY SCORES
───────────────────────────────────────────────────────────────

• Readability:     ${category_scores?.readability || 0}/10
• Technical:       ${category_scores?.technical || 0}/10
• Buzzwords:       ${category_scores?.buzzwords || 0}/10
• Teamwork:        ${category_scores?.teamwork || "N/A"}/10
• Leadership:      ${category_scores?.leadership || "N/A"}/10
• Communication:   ${category_scores?.communication || 0}/10

───────────────────────────────────────────────────────────────
                       KEY SKILLS DETECTED
───────────────────────────────────────────────────────────────

${
    skills.length > 0
        ? skills.map((s) => `• ${s}`).join("\n")
        : "No skills detected"
}

───────────────────────────────────────────────────────────────
                     SUGGESTED JOB ROLES
───────────────────────────────────────────────────────────────

${
    suggested_roles.length > 0
        ? suggested_roles.map((r) => `• ${r}`).join("\n")
        : "No suggestions available"
}

───────────────────────────────────────────────────────────────
                    AREAS FOR IMPROVEMENT
───────────────────────────────────────────────────────────────

${
    improvement_areas.length > 0
        ? improvement_areas.map((a, i) => `${i + 1}. ${a}`).join("\n\n")
        : "No improvements suggested"
}

───────────────────────────────────────────────────────────────
                      CANDIDATE DETAILS
───────────────────────────────────────────────────────────────

Name:     ${resume_data?.name || "Not specified"}
Email:    ${resume_data?.email || "Not specified"}
Location: ${resume_data?.location || "Not specified"}
LinkedIn: ${resume_data?.linkedin || "Not specified"}
GitHub:   ${resume_data?.github || "Not specified"}

═══════════════════════════════════════════════════════════════
              Powered by AI Resume Analyzer
═══════════════════════════════════════════════════════════════
`;
        return report;
    };

    const downloadAsText = () => {
        setIsExporting(true);
        const report = generateTextReport();
        const blob = new Blob([report], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `resume-analysis-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsExporting(false);
        setShowOptions(false);
    };

    const downloadAsJSON = () => {
        setIsExporting(true);
        const blob = new Blob([JSON.stringify(result, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `resume-analysis-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsExporting(false);
        setShowOptions(false);
    };

    const copyToClipboard = async () => {
        setIsExporting(true);
        const report = generateTextReport();
        try {
            await navigator.clipboard.writeText(report);
            alert("Report copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy:", err);
        }
        setIsExporting(false);
        setShowOptions(false);
    };

    const printReport = () => {
        const {
            overall_score = 0,
            summary = "",
            skills = [],
            suggested_roles = [],
            improvement_areas = [],
            category_scores = {},
            resume_data = {},
        } = result || {};

        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Resume Analysis Report</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
                    h1 { color: #4F46E5; border-bottom: 2px solid #4F46E5; padding-bottom: 10px; }
                    h2 { color: #374151; margin-top: 30px; }
                    .score { font-size: 48px; color: #4F46E5; font-weight: bold; text-align: center; }
                    .summary { background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0; }
                    .skill { display: inline-block; background: #E0E7FF; color: #4338CA; padding: 5px 12px; border-radius: 20px; margin: 4px; }
                    .role { display: inline-block; background: #DBEAFE; color: #1D4ED8; padding: 5px 12px; border-radius: 20px; margin: 4px; }
                    .improvement { background: #FEF3C7; padding: 10px 15px; border-radius: 8px; margin: 8px 0; border-left: 4px solid #F59E0B; }
                    .category { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #E5E7EB; }
                    .footer { text-align: center; margin-top: 40px; color: #9CA3AF; font-size: 12px; }
                    @media print { body { padding: 20px; } }
                </style>
            </head>
            <body>
                <h1>📄 Resume Analysis Report</h1>
                <p style="color: #6B7280;">Generated on ${new Date().toLocaleString()}</p>
                
                <div class="score">${overall_score}/100</div>
                
                <div class="summary">
                    <h2>Summary</h2>
                    <p>${summary}</p>
                </div>
                
                <h2>Category Scores</h2>
                <div class="category"><span>Readability</span><strong>${
                    category_scores?.readability || 0
                }/10</strong></div>
                <div class="category"><span>Technical Skills</span><strong>${
                    category_scores?.technical || 0
                }/10</strong></div>
                <div class="category"><span>Communication</span><strong>${
                    category_scores?.communication || 0
                }/10</strong></div>
                <div class="category"><span>Leadership</span><strong>${
                    category_scores?.leadership || "N/A"
                }/10</strong></div>
                <div class="category"><span>Teamwork</span><strong>${
                    category_scores?.teamwork || "N/A"
                }/10</strong></div>
                <div class="category"><span>Keywords</span><strong>${
                    category_scores?.buzzwords || 0
                }/10</strong></div>
                
                <h2>Skills Detected</h2>
                <div>${skills
                    .map((s) => `<span class="skill">${s}</span>`)
                    .join("")}</div>
                
                <h2>Suggested Roles</h2>
                <div>${suggested_roles
                    .map((r) => `<span class="role">${r}</span>`)
                    .join("")}</div>
                
                <h2>Areas for Improvement</h2>
                ${improvement_areas
                    .map((a) => `<div class="improvement">${a}</div>`)
                    .join("")}
                
                <h2>Candidate Information</h2>
                <div class="category"><span>Name</span><strong>${
                    resume_data?.name || "Not specified"
                }</strong></div>
                <div class="category"><span>Email</span><strong>${
                    resume_data?.email || "Not specified"
                }</strong></div>
                <div class="category"><span>Location</span><strong>${
                    resume_data?.location || "Not specified"
                }</strong></div>
                
                <div class="footer">
                    Powered by AI Resume Analyzer
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
        setShowOptions(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowOptions(!showOptions)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium text-sm"
            >
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                </svg>
                Export
            </button>

            {showOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <button
                        onClick={printReport}
                        disabled={isExporting}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                        <span>🖨️</span> Print / Save PDF
                    </button>
                    <button
                        onClick={downloadAsText}
                        disabled={isExporting}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                        <span>📄</span> Download as TXT
                    </button>
                    <button
                        onClick={downloadAsJSON}
                        disabled={isExporting}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                        <span>📊</span> Download as JSON
                    </button>
                    <button
                        onClick={copyToClipboard}
                        disabled={isExporting}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                        <span>📋</span> Copy to Clipboard
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExportButton;
