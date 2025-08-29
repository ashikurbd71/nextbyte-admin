import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ErrorDisplay = ({ onGoBack }) => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Data</h2>
                <p className="text-gray-600">Failed to load course enrollment data</p>
                <Button onClick={onGoBack} className="mt-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go Back
                </Button>
            </div>
        </div>
    );
};

export default ErrorDisplay;
