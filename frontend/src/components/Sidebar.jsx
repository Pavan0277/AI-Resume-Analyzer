import React from "react";
import ScoreCircle from "./ScoreCircle";
import ProgressBar from "./ProgressBar";
import ThemeToggle from "./ThemeToggle";
import ResumeHistory from "./ResumeHistory";

const Sidebar = ({ analysisResult, onLoadHistory }) => {
    const { overall_score, category_scores } = analysisResult || {};

    return (
        <aside className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen flex flex-col shadow-xl">
            {/* Header with Theme Toggle */}
            <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">
                        Resume AI
                    </span>
                </div>
                <ThemeToggle />
            </div>

            {/* Score Section */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-linear-to-b from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900">
                <div className="flex justify-center mb-4">
                    <ScoreCircle score={overall_score || 0} size="large" />
                </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 border-b border-gray-200 dark:border-gray-800">
                <a
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                >
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
                        <svg
                            className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                    </div>
                    <span className="font-medium">Dashboard</span>
                </a>
            </nav>

            {/* Top Fixes Section */}
            <div className="p-5 flex-1 overflow-y-auto">
                <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Category Scores
                </h3>
                <div className="space-y-1 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
                    <ProgressBar
                        label="Readability"
                        score={category_scores?.readability ?? 0}
                    />
                    <ProgressBar
                        label="Teamwork"
                        score={category_scores?.teamwork ?? 0}
                    />
                    <ProgressBar
                        label="Leadership"
                        score={category_scores?.leadership ?? 0}
                    />
                    <ProgressBar
                        label="Communication"
                        score={category_scores?.communication ?? 0}
                    />
                    <ProgressBar
                        label="Technical Skills"
                        score={category_scores?.technical ?? 0}
                    />
                    <ProgressBar
                        label="Buzzwords"
                        score={category_scores?.buzzwords ?? 0}
                    />
                </div>

                {/* Resume History */}
                <ResumeHistory
                    currentResult={analysisResult}
                    onLoadHistory={onLoadHistory}
                />
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Powered by AI Analysis
                </p>
            </div>
        </aside>
    );
};

export default Sidebar;
