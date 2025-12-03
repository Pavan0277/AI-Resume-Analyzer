import React, { useState } from "react";
import { UploadPage, AnalysisPage, ResumeHistoryPage } from "./pages";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
    const [result, setResult] = useState(null);
    const [view, setView] = useState("upload"); // "upload", "analysis", "history"

    const handleAnalysisComplete = (data) => {
        setResult(data);
        setView("analysis");
    };

    const handleBack = () => {
        setResult(null);
        setView("upload");
    };

    const handleLoadHistory = (historyResult) => {
        setResult(historyResult);
        setView("analysis");
    };

    const handleViewHistory = () => {
        setView("history");
    };

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
                {view === "history" ? (
                    <ResumeHistoryPage
                        onSelectResume={handleLoadHistory}
                        onBack={handleBack}
                    />
                ) : view === "analysis" && result ? (
                    <AnalysisPage
                        result={result}
                        onBack={handleBack}
                        onLoadHistory={handleLoadHistory}
                    />
                ) : (
                    <UploadPage
                        onAnalysisComplete={handleAnalysisComplete}
                        onViewHistory={handleViewHistory}
                    />
                )}
            </div>
        </ThemeProvider>
    );
}

export default App;
