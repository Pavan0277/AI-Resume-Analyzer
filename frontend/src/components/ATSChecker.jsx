import React from "react";

const ATSChecker = ({ categoryScores, overallScore }) => {
    const atsFactors = [
        {
            name: "File Format",
            status: "pass",
            message: "PDF format is ATS-friendly",
            icon: "📄",
        },
        {
            name: "Contact Information",
            status: overallScore > 50 ? "pass" : "warning",
            message:
                overallScore > 50
                    ? "Contact details are properly formatted"
                    : "Ensure contact info is at the top",
            icon: "📧",
        },
        {
            name: "Section Headers",
            status: categoryScores?.readability >= 7 ? "pass" : "warning",
            message:
                categoryScores?.readability >= 7
                    ? "Clear section headers detected"
                    : "Use standard section headers",
            icon: "📋",
        },
        {
            name: "Keyword Density",
            status: categoryScores?.buzzwords >= 6 ? "pass" : "fail",
            message:
                categoryScores?.buzzwords >= 6
                    ? "Good keyword usage"
                    : "Add more industry keywords",
            icon: "🔑",
        },
        {
            name: "Formatting",
            status: categoryScores?.readability >= 6 ? "pass" : "warning",
            message:
                categoryScores?.readability >= 6
                    ? "Clean, simple formatting"
                    : "Simplify formatting for ATS",
            icon: "✨",
        },
        {
            name: "Font & Layout",
            status: "pass",
            message: "Standard fonts recommended",
            icon: "🔤",
        },
    ];

    const passCount = atsFactors.filter((f) => f.status === "pass").length;
    const atsScore = Math.round((passCount / atsFactors.length) * 100);

    const getStatusColor = (status) => {
        switch (status) {
            case "pass":
                return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30";
            case "warning":
                return "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30";
            case "fail":
                return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30";
            default:
                return "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "pass":
                return "✓";
            case "warning":
                return "!";
            case "fail":
                return "✕";
            default:
                return "?";
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <svg
                            className="w-5 h-5 text-purple-600 dark:text-purple-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    ATS Compatibility
                </h3>
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {atsScore}%
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Compatible
                    </span>
                </div>
            </div>

            <div className="space-y-3">
                {atsFactors.map((factor, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-xl">{factor.icon}</span>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white text-sm">
                                    {factor.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {factor.message}
                                </p>
                            </div>
                        </div>
                        <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getStatusColor(
                                factor.status
                            )}`}
                        >
                            {getStatusIcon(factor.status)}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <p className="text-sm text-purple-700 dark:text-purple-300">
                    <strong>Tip:</strong> Most companies use ATS (Applicant
                    Tracking Systems) to filter resumes. A higher ATS score
                    means better chances of getting past the initial screening.
                </p>
            </div>
        </div>
    );
};

export default ATSChecker;
