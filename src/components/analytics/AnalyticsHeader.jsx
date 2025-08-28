import React from "react";

const AnalyticsHeader = () => {
    return (
        <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Analytics Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
                Track your performance and gain insights into your business metrics.
            </p>
        </div>
    );
};

export default AnalyticsHeader;
