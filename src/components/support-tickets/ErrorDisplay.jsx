import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const ErrorDisplay = ({ error, onRetry }) => {
    return (
        <div className="flex items-center justify-center h-64">
            <div className="text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Tickets</h3>
                <p className="text-gray-600 mb-4">{error?.data?.message || "Something went wrong"}</p>
                <Button onClick={onRetry}>Try Again</Button>
            </div>
        </div>
    );
};

export default ErrorDisplay;
