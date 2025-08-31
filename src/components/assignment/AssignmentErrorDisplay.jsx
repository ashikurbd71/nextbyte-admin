import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, X } from "lucide-react";

const AssignmentErrorDisplay = ({
    error,
    onRetry,
    onClose,
    title = "Error Loading Assignments",
    showCloseButton = true
}) => {
    if (!error) return null;

    const getErrorMessage = (error) => {
        if (typeof error === 'string') return error;

        if (error?.data?.message) return error.data.message;
        if (error?.error) return error.error;
        if (error?.message) return error.message;

        return "An unexpected error occurred. Please try again.";
    };

    const getErrorType = (error) => {
        if (error?.status === 404) return "Not Found";
        if (error?.status === 403) return "Access Denied";
        if (error?.status === 401) return "Unauthorized";
        if (error?.status >= 500) return "Server Error";
        if (error?.status >= 400) return "Client Error";

        return "Error";
    };

    const errorType = getErrorType(error);
    const errorMessage = getErrorMessage(error);

    return (
        <Card className="border-red-200 bg-red-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold text-red-800 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    {title}
                </CardTitle>
                {showCloseButton && onClose && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Badge variant="destructive" className="text-xs">
                            {errorType}
                        </Badge>
                        {error?.status && (
                            <Badge variant="outline" className="text-xs">
                                Status: {error.status}
                            </Badge>
                        )}
                    </div>
                    <p className="text-red-700 text-sm leading-relaxed">
                        {errorMessage}
                    </p>
                </div>

                {onRetry && (
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onRetry}
                            className="flex items-center gap-2 text-red-700 border-red-300 hover:bg-red-100"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Try Again
                        </Button>
                    </div>
                )}

                {/* Additional error details for development */}
                {process.env.NODE_ENV === 'development' && error?.originalError && (
                    <details className="mt-4">
                        <summary className="text-xs text-red-600 cursor-pointer hover:text-red-700">
                            Show Technical Details
                        </summary>
                        <pre className="mt-2 text-xs text-red-600 bg-red-100 p-2 rounded overflow-auto">
                            {JSON.stringify(error.originalError, null, 2)}
                        </pre>
                    </details>
                )}
            </CardContent>
        </Card>
    );
};

// Badge component if not imported
const Badge = ({ variant = "default", className = "", children }) => {
    const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
    const variantClasses = {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "text-foreground border border-input"
    };

    return (
        <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
            {children}
        </span>
    );
};

export default AssignmentErrorDisplay;
