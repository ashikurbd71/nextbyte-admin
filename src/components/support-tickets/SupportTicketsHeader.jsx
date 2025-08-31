import React from "react";

const SupportTicketsHeader = () => {
    return (
        <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Support Tickets
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
                Manage and track support tickets from users.
            </p>
        </div>
    );
};

export default SupportTicketsHeader;
