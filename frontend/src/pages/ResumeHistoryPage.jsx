import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constant/constants";

const ResumeHistoryPage = ({ onSelectResume, onBack }) => {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        skills: "",
        suggested_roles: "",
        minScore: "",
        maxScore: "",
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
    });
    const [filterOptions, setFilterOptions] = useState({
        skills: [],
        suggested_roles: [],
    });
    const [showFilters, setShowFilters] = useState(false);

    // Fetch filter options on mount
    useEffect(() => {
        fetchFilterOptions();
    }, []);

    // Fetch resumes when filters or page changes
    useEffect(() => {
        fetchResumes();
    }, [pagination.currentPage]);

    const fetchFilterOptions = async () => {
        try {
            const response = await axios.get(
                `${apiBaseUrl}/api/filter-options`
            );
            setFilterOptions(response.data);
        } catch (error) {
            console.error("Error fetching filter options:", error);
        }
    };

    const fetchResumes = async () => {
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
            setResumes(response.data.resumes);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error("Error fetching resumes:", error);
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
        fetchResumes();
    };

    const clearFilters = () => {
        setFilters({
            skills: "",
            suggested_roles: "",
            minScore: "",
            maxScore: "",
        });
        setPagination({ ...pagination, currentPage: 1 });
        setTimeout(fetchResumes, 100);
    };

    const handleResumeClick = async (resumeId) => {
        try {
            const response = await axios.get(
                `${apiBaseUrl}/api/history/${resumeId}`
            );
            onSelectResume(response.data.aiSummary);
        } catch (error) {
            console.error("Error fetching resume details:", error);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80)
            return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30";
        if (score >= 60)
            return "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30";
        return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30";
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Header */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onBack}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                <svg
                                    className="w-6 h-6 text-gray-600 dark:text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    Resume History
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    {pagination.totalItems} resumes analyzed
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
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
                                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                />
                            </svg>
                            Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
                <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Skills
                                </label>
                                <input
                                    type="text"
                                    name="skills"
                                    value={filters.skills}
                                    onChange={handleFilterChange}
                                    placeholder="e.g., React, Python"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Comma-separated
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Suggested Roles
                                </label>
                                <input
                                    type="text"
                                    name="suggested_roles"
                                    value={filters.suggested_roles}
                                    onChange={handleFilterChange}
                                    placeholder="e.g., Developer, Designer"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Comma-separated
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-4">
                            <button
                                onClick={applyFilters}
                                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                            >
                                Apply Filters
                            </button>
                            <button
                                onClick={clearFilters}
                                className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Resume List */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <svg
                            className="animate-spin w-12 h-12 text-indigo-600"
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
                ) : resumes.length === 0 ? (
                    <div className="text-center py-20">
                        <svg
                            className="w-20 h-20 text-gray-400 dark:text-gray-600 mx-auto mb-4"
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
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No resumes found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Try adjusting your filters or analyze a new resume
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-4">
                            {resumes.map((resume) => (
                                <div
                                    key={resume._id}
                                    onClick={() =>
                                        handleResumeClick(resume._id)
                                    }
                                    className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                    {resume.aiSummary
                                                        ?.resume_data?.name ||
                                                        resume.name ||
                                                        "Anonymous"}
                                                </h3>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(
                                                        resume.aiSummary
                                                            ?.overall_score || 0
                                                    )}`}
                                                >
                                                    {resume.aiSummary
                                                        ?.overall_score || 0}
                                                    /100
                                                </span>
                                            </div>

                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                                                {resume.aiSummary?.summary ||
                                                    "No summary available"}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {resume.aiSummary?.skills
                                                    ?.slice(0, 5)
                                                    .map((skill, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-2 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                {resume.aiSummary?.skills
                                                    ?.length > 5 && (
                                                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                                                        +
                                                        {resume.aiSummary.skills
                                                            .length - 5}{" "}
                                                        more
                                                    </span>
                                                )}
                                            </div>

                                            {resume.aiSummary?.suggested_roles
                                                ?.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        Roles:
                                                    </span>
                                                    {resume.aiSummary.suggested_roles
                                                        .slice(0, 3)
                                                        .map((role, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full"
                                                            >
                                                                {role}
                                                            </span>
                                                        ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="text-right ml-4">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                                {formatDate(resume.createdAt)}
                                            </p>
                                            <svg
                                                className="w-6 h-6 text-gray-400 dark:text-gray-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors ml-auto"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-8">
                                <button
                                    onClick={() =>
                                        setPagination({
                                            ...pagination,
                                            currentPage:
                                                pagination.currentPage - 1,
                                        })
                                    }
                                    disabled={!pagination.hasPrev}
                                    className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                    Previous
                                </button>

                                <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
                                    Page {pagination.currentPage} of{" "}
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
                                    className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ResumeHistoryPage;
