import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

const CourseErrorDisplay = ({ error, onRetry }) => {
    const getErrorMessage = (error) => {
        if (error?.data?.message) {
            return error.data.message;
        }
        if (error?.error) {
            return error.error;
        }
        if (typeof error === "string") {
            return error;
        }
        return "An error occurred while loading courses. Please try again.";
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Failed to Load Courses
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
                {getErrorMessage(error)}
            </p>
            <Button
                onClick={onRetry}
                className="flex items-center gap-2"
                variant="outline"
            >
                <RefreshCw className="h-4 w-4" />
                Try Again
            </Button>
        </div>
    );
};

export default CourseErrorDisplay;
