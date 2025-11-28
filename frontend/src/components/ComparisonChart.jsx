import React from "react";

const ComparisonChart = ({ categoryScores }) => {
    const categories = [
        { key: "readability", label: "Readability", avg: 6.5 },
        { key: "technical", label: "Technical", avg: 7.0 },
        { key: "buzzwords", label: "Keywords", avg: 5.5 },
        { key: "teamwork", label: "Teamwork", avg: 6.0 },
        { key: "leadership", label: "Leadership", avg: 5.0 },
        { key: "communication", label: "Communication", avg: 6.5 },
    ];

    const getBarWidth = (score) => `${(score / 10) * 100}%`;

    const getScoreColor = (score, avg) => {
        if (score >= avg + 1)
            return "bg-gradient-to-r from-green-400 to-emerald-500";
        if (score >= avg - 1)
            return "bg-gradient-to-r from-yellow-400 to-amber-500";
        return "bg-gradient-to-r from-red-400 to-red-500";
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                    <svg
                        className="w-5 h-5 text-amber-600 dark:text-amber-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                </div>
                Score Comparison
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Your scores vs. average candidates
            </p>

            <div className="space-y-4">
                {categories.map((cat) => {
                    const score = categoryScores?.[cat.key] ?? 0;
                    return (
                        <div key={cat.key}>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {cat.label}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                                        {score}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        / 10
                                    </span>
                                </div>
                            </div>
                            <div className="relative">
                                {/* Background bar */}
                                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    {/* Your score */}
                                    <div
                                        className={`h-full rounded-full transition-all duration-700 ${getScoreColor(
                                            score,
                                            cat.avg
                                        )}`}
                                        style={{ width: getBarWidth(score) }}
                                    />
                                </div>
                                {/* Average marker */}
                                <div
                                    className="absolute top-0 h-3 w-0.5 bg-gray-400 dark:bg-gray-500"
                                    style={{ left: getBarWidth(cat.avg) }}
                                    title={`Average: ${cat.avg}`}
                                />
                            </div>
                            <div className="flex justify-between mt-1">
                                <span className="text-xs text-gray-400">0</span>
                                <span className="text-xs text-gray-400">
                                    Avg: {cat.avg}
                                </span>
                                <span className="text-xs text-gray-400">
                                    10
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-linear-to-r from-green-400 to-emerald-500" />
                    <span>Above Avg</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-linear-to-r from-yellow-400 to-amber-500" />
                    <span>Average</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-linear-to-r from-red-400 to-red-500" />
                    <span>Below Avg</span>
                </div>
            </div>
        </div>
    );
};

export default ComparisonChart;
