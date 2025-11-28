import React, { useState } from "react";
import {
    Sidebar,
    ScoreBar,
    SkillBadge,
    ResumePreview,
    ATSChecker,
    KeywordMatcher,
    ExportButton,
    ShareButton,
    ComparisonChart,
} from "../components";

const AnalysisPage = ({ result, onBack, onLoadHistory }) => {
    const [activeTab, setActiveTab] = useState("overview");

    const {
        overall_score = 0,
        summary = "",
        skills = [],
        suggested_roles = [],
        category_scores = {},
        improvement_areas = [],
        resume_data = {},
    } = result || {};

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        return "Good evening";
    };

    const tabs = [
        { id: "overview", label: "Overview", icon: "📊" },
        { id: "ats", label: "ATS Check", icon: "🤖" },
        { id: "match", label: "Job Match", icon: "🎯" },
        { id: "compare", label: "Compare", icon: "📈" },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "ats":
                return (
                    <div className="space-y-6">
                        <ATSChecker
                            categoryScores={category_scores}
                            overallScore={overall_score}
                        />

                        {/* ATS Tips */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                💡 ATS Optimization Tips
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500">✓</span>
                                    Use standard section headings like
                                    "Experience", "Education", "Skills"
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500">✓</span>
                                    Avoid tables, graphics, and columns - ATS
                                    can't read them properly
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500">✓</span>
                                    Include keywords from the job description
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500">✓</span>
                                    Use standard fonts like Arial, Calibri, or
                                    Times New Roman
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500">✓</span>
                                    Save your resume as a .docx or .pdf file
                                </li>
                            </ul>
                        </div>
                    </div>
                );

            case "match":
                return (
                    <div className="space-y-6">
                        <KeywordMatcher skills={skills} />

                        {/* Your Skills Summary */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                Your Current Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case "compare":
                return (
                    <div className="space-y-6">
                        <ComparisonChart categoryScores={category_scores} />

                        {/* Insights */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                📌 Key Insights
                            </h3>
                            <div className="space-y-3">
                                {category_scores?.technical >= 7 && (
                                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-sm text-green-700 dark:text-green-400">
                                        ✨ Your technical skills are above
                                        average - great for tech roles!
                                    </div>
                                )}
                                {category_scores?.readability < 6 && (
                                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl text-sm text-yellow-700 dark:text-yellow-400">
                                        ⚠️ Consider improving readability with
                                        clearer formatting
                                    </div>
                                )}
                                {category_scores?.buzzwords < 5 && (
                                    <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl text-sm text-orange-700 dark:text-orange-400">
                                        💡 Add more industry-specific keywords
                                        to stand out
                                    </div>
                                )}
                                {overall_score >= 70 && (
                                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-sm text-purple-700 dark:text-purple-400">
                                        🎉 Your resume is performing well
                                        overall - you're in the top 30%!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <>
                        {/* Score Summary */}
                        <div className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-6 mb-8 border border-gray-100 dark:border-gray-700 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                Your resume scored{" "}
                                <span className="text-indigo-600 dark:text-indigo-400">
                                    {overall_score}
                                </span>{" "}
                                out of 100.
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {summary ||
                                    "You made a good start to your resume, and it scores well on some key checks hiring managers care about."}
                            </p>
                            <ScoreBar score={overall_score} />
                        </div>

                        {/* Tips Section */}
                        <div className="bg-linear-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-100 dark:border-indigo-800/50 rounded-2xl p-6 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl">
                                    <svg
                                        className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                        Pro Tip
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Use the feedback to find and fix errors
                                        in your resume, then reupload it to get
                                        a new score.{" "}
                                        <span className="font-medium text-indigo-600 dark:text-indigo-400">
                                            80% of people increase their score
                                            by over 20 points
                                        </span>{" "}
                                        with just three uploads and revisions.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Skills Section */}
                        {skills && skills.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                        <svg
                                            className="w-4 h-4 text-green-600 dark:text-green-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    Key Skills Detected
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, index) => (
                                        <SkillBadge
                                            key={index}
                                            skill={skill}
                                            type="skill"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Suggested Roles */}
                        {suggested_roles && suggested_roles.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                        <svg
                                            className="w-4 h-4 text-blue-600 dark:text-blue-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                                clipRule="evenodd"
                                            />
                                            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                        </svg>
                                    </div>
                                    Suggested Job Roles
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {suggested_roles.map((role, index) => (
                                        <SkillBadge
                                            key={index}
                                            skill={role}
                                            type="role"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Improvement Areas */}
                        {improvement_areas && improvement_areas.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <div className="p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                                        <svg
                                            className="w-4 h-4 text-orange-600 dark:text-orange-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    Areas for Improvement
                                </h3>
                                <div className="space-y-3">
                                    {improvement_areas.map((area, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 p-4 bg-linear-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-100 dark:border-orange-800/50 rounded-xl"
                                        >
                                            <div className="p-1 bg-orange-100 dark:bg-orange-900/50 rounded-full mt-0.5">
                                                <svg
                                                    className="w-4 h-4 text-orange-500 dark:text-orange-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">
                                                {area}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                );
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
            {/* Sidebar */}
            <Sidebar analysisResult={result} onLoadHistory={onLoadHistory} />

            {/* Main Content */}
            <main className="flex-1 flex overflow-hidden">
                {/* Analysis Panel */}
                <div className="w-1/2 p-8 overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                    {/* Header with Export & Share */}
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {greeting()}, there! 👋
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                Welcome to your resume review.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <ExportButton result={result} />
                            <ShareButton result={result} />
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex gap-2 mb-6 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                                    activeTab === tab.id
                                        ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                }`}
                            >
                                <span>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {renderTabContent()}

                    {/* Analyze Again Button */}
                    <button
                        onClick={onBack}
                        className="w-full mt-8 py-4 px-6 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 dark:hover:shadow-indigo-500/20"
                    >
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
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                        Analyze Another Resume
                    </button>
                </div>

                {/* Resume Preview Panel */}
                <div className="w-1/2 p-8 bg-gray-100 dark:bg-gray-950 overflow-y-auto">
                    <ResumePreview resumeData={resume_data} skills={skills} />
                </div>
            </main>
        </div>
    );
};

export default AnalysisPage;
