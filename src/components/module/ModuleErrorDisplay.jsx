import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const ModuleErrorDisplay = ({ error, onRetry }) => {
    const getErrorMessage = (error) => {
        if (error?.data?.message) {
            return error.data.message;
        }
        if (error?.error) {
            return error.error;
        }
        if (error?.message) {
            return error.message;
        }
        return "An unexpected error occurred while loading modules.";
    };

    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle className="text-xl text-red-600">Error Loading Modules</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-muted-foreground">
                        {getErrorMessage(error)}
                    </p>
                    {onRetry && (
                        <Button onClick={onRetry} variant="outline" className="w-full">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Try Again
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ModuleErrorDisplay;
