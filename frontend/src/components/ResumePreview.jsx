import React from "react";

const ResumePreview = ({ resumeData, skills: topSkills }) => {
    const {
        name,
        email,
        location,
        linkedin,
        github,
        portfolio,
        education,
        experience,
        projects,
    } = resumeData || {};

    // Use skills from resumeData or fallback to topSkills passed from parent
    const skills = resumeData?.skills || topSkills || [];

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/20 p-8 max-h-[calc(100vh-100px)] overflow-y-auto border border-gray-100 dark:border-gray-800">
            {/* Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-5 mb-6">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {name || "Resume Preview"}
                        </h1>
                        <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-600 dark:text-gray-400">
                            {location && (
                                <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                                    <svg
                                        className="w-4 h-4 text-red-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {location}
                                </span>
                            )}
                            {email && (
                                <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                                    <svg
                                        className="w-4 h-4 text-blue-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    {email}
                                </span>
                            )}
                            {linkedin && (
                                <a
                                    href={
                                        linkedin.startsWith("http")
                                            ? linkedin
                                            : `https://${linkedin}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    LinkedIn
                                </a>
                            )}
                            {github && (
                                <a
                                    href={
                                        github.startsWith("http")
                                            ? github
                                            : `https://${github}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    GitHub
                                </a>
                            )}
                            {portfolio && (
                                <a
                                    href={
                                        portfolio.startsWith("http")
                                            ? portfolio
                                            : `https://${portfolio}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Portfolio
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Education */}
            {education && education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                            <svg
                                className="w-4 h-4 text-indigo-600 dark:text-indigo-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z" />
                            </svg>
                        </div>
                        Education
                    </h2>
                    <div className="space-y-4">
                        {education.map((edu, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700"
                            >
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            {edu.institution}
                                        </h3>
                                        {edu.degree && (
                                            <p className="text-sm text-gray-600 dark:text-gray-400 italic mt-1">
                                                {edu.degree}
                                            </p>
                                        )}
                                        {edu.gpa && (
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                <span className="font-medium">
                                                    CGPA:
                                                </span>{" "}
                                                {edu.gpa}
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                                        {edu.duration && (
                                            <p className="font-medium">
                                                {edu.duration}
                                            </p>
                                        )}
                                        {edu.location && <p>{edu.location}</p>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <svg
                                className="w-4 h-4 text-green-600 dark:text-green-400"
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
                        Experience
                    </h2>
                    <div className="space-y-4">
                        {experience.map((exp, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700"
                            >
                                <div className="flex justify-between mb-2">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            {exp.title}
                                        </h3>
                                        {exp.technologies && (
                                            <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">
                                                {exp.technologies}
                                            </p>
                                        )}
                                    </div>
                                    {exp.duration && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap ml-4">
                                            {exp.duration}
                                        </p>
                                    )}
                                </div>
                                {exp.achievements &&
                                    exp.achievements.length > 0 && (
                                        <ul className="list-disc list-outside text-sm text-gray-700 dark:text-gray-300 space-y-1 ml-5 mt-3">
                                            {exp.achievements.map(
                                                (achievement, i) => (
                                                    <li key={i}>
                                                        {achievement}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <svg
                                className="w-4 h-4 text-purple-600 dark:text-purple-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm1 5a1 1 0 00-1 1v2a1 1 0 001 1h12a1 1 0 001-1v-2a1 1 0 00-1-1H4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        Projects
                    </h2>
                    <div className="space-y-4">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700"
                            >
                                <div className="flex justify-between mb-2">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                            {project.name}
                                            {project.link && (
                                                <a
                                                    href={
                                                        project.link.startsWith(
                                                            "http"
                                                        )
                                                            ? project.link
                                                            : `https://${project.link}`
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                                    </svg>
                                                </a>
                                            )}
                                        </h3>
                                        {project.technologies && (
                                            <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">
                                                {project.technologies}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                {project.highlights &&
                                    project.highlights.length > 0 && (
                                        <ul className="list-disc list-outside text-sm text-gray-700 dark:text-gray-300 space-y-1 ml-5 mt-3">
                                            {project.highlights.map(
                                                (highlight, i) => (
                                                    <li key={i}>{highlight}</li>
                                                )
                                            )}
                                        </ul>
                                    )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
                <section>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                            <svg
                                className="w-4 h-4 text-amber-600 dark:text-amber-400"
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
                        Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <span
                                key={index}
                                className="px-3 py-1.5 bg-linear-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-600 hover:scale-105 transition-transform cursor-default"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Show message if no data */}
            {!education?.length &&
                !experience?.length &&
                !projects?.length &&
                !skills?.length && (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                            <svg
                                className="w-8 h-8 text-gray-400 dark:text-gray-500 animate-pulse"
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
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                            Analyzing your resume...
                        </p>
                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                            This may take a moment
                        </p>
                    </div>
                )}
        </div>
    );
};

export default ResumePreview;
