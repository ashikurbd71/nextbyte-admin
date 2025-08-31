import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const AssignmentSubmissionErrorDisplay = ({ error, onRetry, title = "Error Loading Assignment Submissions" }) => {
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
        return 'An unexpected error occurred while loading assignment submissions.';
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
            <div className="flex flex-col items-center space-y-4 max-w-md">
                <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-600">
                        {getErrorMessage(error)}
                    </p>
                </div>

                {onRetry && (
                    <Button
                        onClick={onRetry}
                        className="flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                    </Button>
                )}
            </div>
        </div>
    );
};

export default AssignmentSubmissionErrorDisplay;
