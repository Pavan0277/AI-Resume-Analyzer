import React, { useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constant/constants";
import { ThemeToggle } from "../components";

const UploadPage = ({ onAnalysisComplete }) => {
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dragActive, setDragActive] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setText("");
            setError("");
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (
                droppedFile.type === "application/pdf" ||
                droppedFile.type === "text/plain"
            ) {
                setFile(droppedFile);
                setText("");
                setError("");
                // Auto-analyze after dropping file
                autoAnalyze(droppedFile);
            } else {
                setError("Please upload a PDF or TXT file");
            }
        }
    };

    const autoAnalyze = async (droppedFile) => {
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("resume", droppedFile);

        try {
            const response = await axios.post(
                `${apiBaseUrl}/api/analyze`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            onAnalysisComplete(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to analyze resume. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
        setFile(null);
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file && !text.trim()) {
            setError("Please upload a file or paste your resume text");
            return;
        }

        setLoading(true);
        setError("");

        const formData = new FormData();
        if (file) {
            formData.append("resume", file);
        } else {
            formData.append("text", text);
        }

        try {
            const response = await axios.post(
                `${apiBaseUrl}/api/analyze`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            onAnalysisComplete(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to analyze resume. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 dark:bg-indigo-900/30 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900/30 rounded-full blur-3xl opacity-50" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" />
            </div>

            {/* Theme Toggle */}
            <div className="absolute top-6 right-6 z-10">
                <ThemeToggle />
            </div>

            <div className="max-w-2xl w-full relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-xl shadow-indigo-500/25 dark:shadow-indigo-500/20">
                        <svg
                            className="w-10 h-10 text-white"
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
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        AI Resume Analyzer
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Get instant AI-powered feedback on your resume
                    </p>
                </div>

                {/* Upload Card */}
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl dark:shadow-black/20 p-8 border border-gray-100 dark:border-gray-800">
                    <form onSubmit={handleSubmit}>
                        {/* Drag & Drop Zone */}
                        <div
                            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                                dragActive
                                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 scale-[1.02]"
                                    : file
                                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                    : "border-gray-300 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                            }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                accept=".pdf,.txt"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />

                            {file ? (
                                <div className="space-y-4">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-green-400 to-emerald-500 rounded-2xl shadow-lg shadow-green-500/25">
                                        <svg
                                            className="w-8 h-8 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {file.name}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Click or drag to replace
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl">
                                        <svg
                                            className="w-8 h-8 text-gray-400 dark:text-gray-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Drop your resume here
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        or click to browse (PDF, TXT)
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-4 bg-white dark:bg-gray-900 text-sm text-gray-500 dark:text-gray-400 font-medium">
                                    or paste your resume text
                                </span>
                            </div>
                        </div>

                        {/* Text Area */}
                        <textarea
                            rows="5"
                            value={text}
                            onChange={handleTextChange}
                            className="w-full px-5 py-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent resize-none transition-all"
                            placeholder="Paste your resume content here..."
                        />

                        {/* Error Message */}
                        {error && (
                            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl">
                                <p className="text-red-600 dark:text-red-400 text-sm flex items-center gap-2 font-medium">
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full mt-6 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                                loading
                                    ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                                    : "bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl hover:shadow-indigo-500/25 dark:hover:shadow-indigo-500/20 hover:scale-[1.02]"
                            }`}
                        >
                            {loading ? (
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
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Analyzing your resume...
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
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                    Analyze Resume
                                </>
                            )}
                        </button>
                    </form>

                    {/* Features */}
                    <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                        <div className="grid grid-cols-3 gap-6 text-center">
                            <div className="group">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                                    <svg
                                        className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                    </svg>
                                </div>
                                <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                                    AI
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Powered Analysis
                                </div>
                            </div>
                            <div className="group">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                                    <svg
                                        className="w-6 h-6 text-green-600 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="text-xl font-bold text-green-600 dark:text-green-400">
                                    100%
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Free to Use
                                </div>
                            </div>
                            <div className="group">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                                    <svg
                                        className="w-6 h-6 text-purple-600 dark:text-purple-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                                    ~10s
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Quick Results
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
                    Your data is processed securely and never stored permanently
                </p>
            </div>
        </div>
    );
};

export default UploadPage;
