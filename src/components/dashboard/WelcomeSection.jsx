import React from "react";

const WelcomeSection = () => {
    return (
        <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Welcome back, Admin! 👋
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
                Here's what's happening with your projects today.
            </p>
        </div>
    );
};

export default WelcomeSection;
