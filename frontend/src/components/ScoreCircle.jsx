import React from "react";

const ScoreCircle = ({ score, size = "large" }) => {
    const radius = size === "large" ? 70 : 40;
    const strokeWidth = size === "large" ? 10 : 6;
    const circumference = 2 * Math.PI * radius;
    const progress = (score / 100) * circumference;
    const dashOffset = circumference - progress;

    const getScoreColor = (score) => {
        if (score >= 80)
            return { color: "#22c55e", glow: "rgba(34, 197, 94, 0.3)" };
        if (score >= 60)
            return { color: "#f97316", glow: "rgba(249, 115, 22, 0.3)" };
        if (score >= 40)
            return { color: "#eab308", glow: "rgba(234, 179, 8, 0.3)" };
        return { color: "#ef4444", glow: "rgba(239, 68, 68, 0.3)" };
    };

    const { color, glow } = getScoreColor(score);
    const circleSize = size === "large" ? 180 : 100;
    const center = circleSize / 2;

    return (
        <div className="relative inline-flex items-center justify-center">
            {/* Glow effect */}
            <div
                className="absolute rounded-full blur-xl opacity-50"
                style={{
                    width: circleSize * 0.8,
                    height: circleSize * 0.8,
                    backgroundColor: glow,
                }}
            />
            <svg
                width={circleSize}
                height={circleSize}
                className="transform -rotate-90 relative z-10"
            >
                {/* Background circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    className="stroke-gray-200 dark:stroke-gray-700"
                    strokeWidth={strokeWidth}
                />
                {/* Progress circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                    style={{
                        filter: `drop-shadow(0 0 6px ${glow})`,
                    }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <span
                    className={`font-bold ${
                        size === "large" ? "text-4xl" : "text-2xl"
                    }`}
                    style={{ color }}
                >
                    {score}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
                    Score
                </span>
            </div>
        </div>
    );
};

export default ScoreCircle;
