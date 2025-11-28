import React from "react";

const ScoreBar = ({ score }) => {
    const getPointerPosition = () => {
        return `${score}%`;
    };

    return (
        <div className="relative mt-6">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
                <span className="uppercase tracking-wider">Your Resume</span>
            </div>
            <div
                className="relative h-4 rounded-full overflow-hidden shadow-inner"
                style={{
                    background:
                        "linear-gradient(to right, #ef4444, #f97316, #eab308, #84cc16, #22c55e)",
                }}
            >
                {/* Position marker */}
                <div
                    className="absolute top-0 w-1 h-full bg-white shadow-lg transform -translate-x-1/2"
                    style={{ left: getPointerPosition() }}
                />
                <div
                    className="absolute -top-1 w-6 h-6 bg-white dark:bg-gray-200 rounded-full border-3 border-indigo-600 shadow-lg transform -translate-x-1/2 flex items-center justify-center"
                    style={{ left: getPointerPosition() }}
                >
                    <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
                <span>0</span>
                <span className="text-right uppercase tracking-wider">
                    Top Resumes
                </span>
            </div>
        </div>
    );
};

export default ScoreBar;
