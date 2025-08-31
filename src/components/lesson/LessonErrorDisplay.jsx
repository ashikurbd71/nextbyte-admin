import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const LessonErrorDisplay = ({ error, onRetry }) => {
    if (!error) return null;

    return (
        <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div className="flex-1">
                        <h3 className="text-sm font-medium text-red-800">
                            Error Loading Lessons
                        </h3>
                        <p className="text-sm text-red-700 mt-1">
                            {error?.data?.message || error?.message || "An unexpected error occurred while loading lessons."}
                        </p>
                    </div>
                    {onRetry && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onRetry}
                            className="border-red-300 text-red-700 hover:bg-red-100"
                        >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Retry
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default LessonErrorDisplay;
