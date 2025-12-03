import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constant/constants";

const ResumeHistory = ({ onLoadHistory, currentResult }) => {
    const [history, setHistory] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        skills: "",
        suggested_roles: "",
        minScore: "",
        maxScore: "",
    });
    const [showFilters, setShowFilters] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        hasNext: false,
        hasPrev: false,
    });

    // Fetch history from API when opened
    useEffect(() => {
        if (isOpen) {
            fetchHistory();
        }
    }, [isOpen, pagination.currentPage]);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const params = {
                page: pagination.currentPage,
                limit: 10,
                sortBy: "createdAt",
                sortOrder: "desc",
            };

            if (filters.skills) params.skills = filters.skills;
            if (filters.suggested_roles)
                params.suggested_roles = filters.suggested_roles;
            if (filters.minScore) params.minScore = filters.minScore;
            if (filters.maxScore) params.maxScore = filters.maxScore;

            const response = await axios.get(`${apiBaseUrl}/api/history`, {
                params,
            });
            setHistory(response.data.resumes || []);
            setPagination(
                response.data.pagination || {
                    currentPage: 1,
                    totalPages: 1,
                    totalItems: 0,
                    hasNext: false,
                    hasPrev: false,
                }
            );
        } catch (error) {
            console.error("Error fetching history:", error);
            setHistory([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const applyFilters = () => {
        setPagination({ ...pagination, currentPage: 1 });
        fetchHistory();
    };

    const clearFilters = () => {
        setFilters({
            skills: "",
            suggested_roles: "",
            minScore: "",
            maxScore: "",
        });
        setPagination({ ...pagination, currentPage: 1 });
        setTimeout(fetchHistory, 100);
    };

    const handleResumeClick = async (resumeId) => {
        try {
            const response = await axios.get(
                `${apiBaseUrl}/api/history/${resumeId}`
            );
            if (onLoadHistory && response.data.aiSummary) {
                onLoadHistory(response.data.aiSummary);
                setIsOpen(false); // Close sidebar after loading
            }
        } catch (error) {
            console.error("Error fetching resume details:", error);
        }
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

    const getScoreBadgeColor = (score) => {
        if (score >= 80)
            return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
        if (score >= 60)
            return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400";
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
    };

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
                    History{" "}
                    {pagination.totalItems > 0 && `(${pagination.totalItems})`}
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
                <div className="mt-3 space-y-3">
                    {/* Filter Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-lg text-xs font-medium transition-colors"
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
                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                            />
                        </svg>
                        {showFilters ? "Hide Filters" : "Show Filters"}
                    </button>

                    {/* Filters Panel */}
                    {showFilters && (
                        <div className="space-y-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                    Skills
                                </label>
                                <input
                                    type="text"
                                    name="skills"
                                    value={filters.skills}
                                    onChange={handleFilterChange}
                                    placeholder="e.g., React, Python"
                                    className="w-full px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-1 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                    Roles
                                </label>
                                <input
                                    type="text"
                                    name="suggested_roles"
                                    value={filters.suggested_roles}
                                    onChange={handleFilterChange}
                                    placeholder="e.g., Developer"
                                    className="w-full px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-1 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Min Score
                                    </label>
                                    <input
                                        type="number"
                                        name="minScore"
                                        value={filters.minScore}
                                        onChange={handleFilterChange}
                                        placeholder="0"
                                        min="0"
                                        max="100"
                                        className="w-full px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-1 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Max Score
                                    </label>
                                    <input
                                        type="number"
                                        name="maxScore"
                                        value={filters.maxScore}
                                        onChange={handleFilterChange}
                                        placeholder="100"
                                        min="0"
                                        max="100"
                                        className="w-full px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-1 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button
                                    onClick={applyFilters}
                                    className="flex-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded transition-colors"
                                >
                                    Apply
                                </button>
                                <button
                                    onClick={clearFilters}
                                    className="flex-1 px-3 py-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium rounded transition-colors"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <svg
                                className="animate-spin w-6 h-6 text-indigo-600"
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
                        </div>
                    ) : history.length === 0 ? (
                        <div className="text-center py-6">
                            <svg
                                className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-2"
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
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                No resumes found
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* History List */}
                            <div className="space-y-2 max-h-96 overflow-y-auto">
                                {history.map((item, index) => (
                                    <button
                                        key={item._id}
                                        onClick={() =>
                                            handleResumeClick(item._id)
                                        }
                                        className="w-full p-3 text-left bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                    {item.aiSummary?.resume_data
                                                        ?.name ||
                                                        item.name ||
                                                        "Anonymous"}
                                                </p>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {formatDate(item.createdAt)}
                                                </span>
                                            </div>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-bold ${getScoreBadgeColor(
                                                    item.aiSummary
                                                        ?.overall_score || 0
                                                )}`}
                                            >
                                                {item.aiSummary
                                                    ?.overall_score || 0}
                                            </span>
                                        </div>

                                        {/* Skills Preview */}
                                        {item.aiSummary?.skills &&
                                            item.aiSummary.skills.length >
                                                0 && (
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {item.aiSummary.skills
                                                        .slice(0, 3)
                                                        .map((skill, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="px-1.5 py-0.5 text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    {item.aiSummary.skills
                                                        .length > 3 && (
                                                        <span className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
                                                            +
                                                            {item.aiSummary
                                                                .skills.length -
                                                                3}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                    </button>
                                ))}
                            </div>

                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                                    <button
                                        onClick={() =>
                                            setPagination({
                                                ...pagination,
                                                currentPage:
                                                    pagination.currentPage - 1,
                                            })
                                        }
                                        disabled={!pagination.hasPrev}
                                        className="px-2 py-1 text-xs bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        Prev
                                    </button>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">
                                        {pagination.currentPage} /{" "}
                                        {pagination.totalPages}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setPagination({
                                                ...pagination,
                                                currentPage:
                                                    pagination.currentPage + 1,
                                            })
                                        }
                                        disabled={!pagination.hasNext}
                                        className="px-2 py-1 text-xs bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ResumeHistory;
