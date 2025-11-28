import React, { useState, useEffect } from "react";

const ResumeHistory = ({ onLoadHistory, currentResult }) => {
    const [history, setHistory] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Load history from localStorage
        const savedHistory = localStorage.getItem("resumeHistory");
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    useEffect(() => {
        // Save current result to history when it changes
        if (currentResult && currentResult.overall_score !== undefined) {
            const newEntry = {
                id: Date.now(),
                date: new Date().toISOString(),
                score: currentResult.overall_score,
                name: currentResult.resume_data?.name || "Unknown",
                summary: currentResult.summary?.substring(0, 100) + "...",
                result: currentResult,
            };

            setHistory((prev) => {
                // Don't add duplicates
                if (
                    prev.length > 0 &&
                    prev[0].score === newEntry.score &&
                    prev[0].name === newEntry.name
                ) {
                    return prev;
                }
                const updated = [newEntry, ...prev.slice(0, 9)]; // Keep last 10
                localStorage.setItem("resumeHistory", JSON.stringify(updated));
                return updated;
            });
        }
    }, [currentResult]);

    const clearHistory = () => {
        localStorage.removeItem("resumeHistory");
        setHistory([]);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getScoreColor = (score) => {
        if (score >= 80) return "text-green-500";
        if (score >= 60) return "text-yellow-500";
        return "text-red-500";
    };

    if (history.length === 0) {
        return null;
    }

    return (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
                <span className="flex items-center gap-2">
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
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    History ({history.length})
                </span>
                <svg
                    className={`w-4 h-4 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="mt-3 space-y-2">
                    {history.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() =>
                                onLoadHistory && onLoadHistory(item.result)
                            }
                            className="w-full p-3 text-left bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group"
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {formatDate(item.date)}
                                </span>
                                <span
                                    className={`text-sm font-bold ${getScoreColor(
                                        item.score
                                    )}`}
                                >
                                    {item.score}
                                </span>
                            </div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                                {item.name}
                            </p>
                            {index === 0 && (
                                <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full">
                                    Latest
                                </span>
                            )}
                        </button>
                    ))}

                    <button
                        onClick={clearHistory}
                        className="w-full p-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        Clear History
                    </button>
                </div>
            )}
        </div>
    );
};

export default ResumeHistory;
