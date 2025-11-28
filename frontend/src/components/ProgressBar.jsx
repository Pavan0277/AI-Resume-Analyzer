import React from "react";

const ProgressBar = ({ label, score, maxScore = 10 }) => {
    const percentage = Math.min((score / maxScore) * 100, 100);

    const getBarColor = (score, maxScore) => {
        const percent = (score / maxScore) * 100;
        if (percent >= 80)
            return "bg-gradient-to-r from-green-400 to-emerald-500";
        if (percent >= 60)
            return "bg-gradient-to-r from-yellow-400 to-amber-500";
        if (percent >= 40)
            return "bg-gradient-to-r from-orange-400 to-orange-500";
        return "bg-gradient-to-r from-red-400 to-red-500";
    };

    return (
        <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700/50 last:border-0 group hover:bg-gray-50 dark:hover:bg-gray-800/30 px-2 -mx-2 rounded-lg transition-colors">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </span>
            <div className="flex items-center gap-3">
                <div className="w-28 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                    <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${getBarColor(
                            score,
                            maxScore
                        )}`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200 w-6 text-right">
                    {score}
                </span>
            </div>
        </div>
    );
};

export default ProgressBar;
