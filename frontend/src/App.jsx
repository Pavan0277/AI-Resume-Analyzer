import React, { useState } from "react";
import { UploadPage, AnalysisPage } from "./pages";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
    const [result, setResult] = useState(null);

    const handleAnalysisComplete = (data) => {
        setResult(data);
    };

    const handleBack = () => {
        setResult(null);
    };

    const handleLoadHistory = (historyResult) => {
        setResult(historyResult);
    };

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
                {result ? (
                    <AnalysisPage
                        result={result}
                        onBack={handleBack}
                        onLoadHistory={handleLoadHistory}
                    />
                ) : (
                    <UploadPage onAnalysisComplete={handleAnalysisComplete} />
                )}
            </div>
        </ThemeProvider>
    );
}

export default App;
