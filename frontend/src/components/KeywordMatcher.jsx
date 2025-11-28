import React, { useState } from "react";

const KeywordMatcher = ({ skills = [] }) => {
    const [jobDescription, setJobDescription] = useState("");
    const [matchResult, setMatchResult] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const analyzeMatch = () => {
        if (!jobDescription.trim()) return;

        setIsAnalyzing(true);

        // Simulate analysis delay
        setTimeout(() => {
            const jdWords = jobDescription.toLowerCase().split(/\s+/);
            const skillsLower = skills.map((s) => s.toLowerCase());

            // Find matching keywords
            const matched = skillsLower.filter((skill) =>
                jdWords.some(
                    (word) => word.includes(skill) || skill.includes(word)
                )
            );

            // Find missing keywords from JD
            const commonKeywords = [
                "python",
                "javascript",
                "react",
                "node",
                "sql",
                "aws",
                "docker",
                "kubernetes",
                "agile",
                "scrum",
                "leadership",
                "communication",
                "teamwork",
                "problem-solving",
                "java",
                "typescript",
                "mongodb",
                "postgresql",
                "git",
                "ci/cd",
                "rest",
                "api",
                "microservices",
                "cloud",
                "azure",
                "gcp",
                "machine learning",
                "data analysis",
                "excel",
                "tableau",
                "power bi",
            ];

            const jdKeywords = commonKeywords.filter((kw) =>
                jdWords.some((word) => word.includes(kw) || kw.includes(word))
            );

            const missing = jdKeywords.filter(
                (kw) =>
                    !skillsLower.some(
                        (skill) => skill.includes(kw) || kw.includes(skill)
                    )
            );

            const matchScore = Math.min(
                100,
                Math.round(
                    (matched.length / Math.max(jdKeywords.length, 1)) * 100
                )
            );

            setMatchResult({
                score: matchScore || 50,
                matched: matched.slice(0, 10),
                missing: missing.slice(0, 8),
                suggestions: [
                    matched.length < 5 && "Add more relevant technical skills",
                    missing.length > 3 &&
                        "Consider adding missing keywords from the job description",
                    matchScore < 60 && "Tailor your resume more to this role",
                ].filter(Boolean),
            });

            setIsAnalyzing(false);
        }, 1000);
    };

    const getScoreColor = (score) => {
        if (score >= 80) return "text-green-600 dark:text-green-400";
        if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
        return "text-red-600 dark:text-red-400";
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                    <svg
                        className="w-5 h-5 text-cyan-600 dark:text-cyan-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                Job Match Analysis
            </h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Paste Job Description
                    </label>
                    <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the job description here to see how well your resume matches..."
                        className="w-full h-32 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none text-sm"
                    />
                </div>

                <button
                    onClick={analyzeMatch}
                    disabled={!jobDescription.trim() || isAnalyzing}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                        !jobDescription.trim() || isAnalyzing
                            ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                            : "bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-700"
                    }`}
                >
                    {isAnalyzing ? (
                        <>
                            <svg
                                className="animate-spin w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                            Analyze Match
                        </>
                    )}
                </button>

                {matchResult && (
                    <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        {/* Match Score */}
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                Match Score
                            </p>
                            <p
                                className={`text-4xl font-bold ${getScoreColor(
                                    matchResult.score
                                )}`}
                            >
                                {matchResult.score}%
                            </p>
                        </div>

                        {/* Matched Keywords */}
                        {matchResult.matched.length > 0 && (
                            <div>
                                <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                                    ✓ Matching Keywords (
                                    {matchResult.matched.length})
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {matchResult.matched.map((kw, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full"
                                        >
                                            {kw}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Missing Keywords */}
                        {matchResult.missing.length > 0 && (
                            <div>
                                <p className="text-sm font-medium text-orange-600 dark:text-orange-400 mb-2">
                                    ⚠ Consider Adding (
                                    {matchResult.missing.length})
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {matchResult.missing.map((kw, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full"
                                        >
                                            + {kw}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Suggestions */}
                        {matchResult.suggestions.length > 0 && (
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                <p className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-2">
                                    💡 Suggestions
                                </p>
                                <ul className="space-y-1">
                                    {matchResult.suggestions.map((s, i) => (
                                        <li
                                            key={i}
                                            className="text-xs text-blue-600 dark:text-blue-300"
                                        >
                                            • {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default KeywordMatcher;
