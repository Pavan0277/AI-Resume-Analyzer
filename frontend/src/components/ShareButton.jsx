import React, { useState } from "react";

const ShareButton = ({ result }) => {
    const [showModal, setShowModal] = useState(false);
    const [copied, setCopied] = useState(false);

    const generateShareText = () => {
        const {
            overall_score = 0,
            skills = [],
            suggested_roles = [],
        } = result || {};
        return `🎯 My Resume Score: ${overall_score}/100

📌 Key Skills: ${skills.slice(0, 5).join(", ")}

💼 Suggested Roles: ${suggested_roles.slice(0, 3).join(", ")}

Analyzed with AI Resume Analyzer ✨`;
    };

    const shareToTwitter = () => {
        const text = encodeURIComponent(generateShareText());
        window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
    };

    const shareToLinkedIn = () => {
        const text = encodeURIComponent(generateShareText());
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                window.location.href
            )}&summary=${text}`,
            "_blank"
        );
    };

    const copyShareText = async () => {
        try {
            await navigator.clipboard.writeText(generateShareText());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-xl hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors font-medium text-sm"
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
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                </svg>
                Share
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Share Your Results
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                            >
                                <svg
                                    className="w-5 h-5 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl mb-4 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                            {generateShareText()}
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-4">
                            <button
                                onClick={shareToTwitter}
                                className="flex flex-col items-center gap-2 p-3 bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 rounded-xl hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                                <span className="text-xs font-medium">
                                    Twitter
                                </span>
                            </button>
                            <button
                                onClick={shareToLinkedIn}
                                className="flex flex-col items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                <span className="text-xs font-medium">
                                    LinkedIn
                                </span>
                            </button>
                            <button
                                onClick={copyShareText}
                                className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                                    />
                                </svg>
                                <span className="text-xs font-medium">
                                    {copied ? "Copied!" : "Copy"}
                                </span>
                            </button>
                        </div>

                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ShareButton;
