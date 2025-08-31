import React from "react";
import { useSelector } from "react-redux";
import { getAdminRoleDisplay } from "@/lib/enums";

const WelcomeSection = () => {
    const { admin } = useSelector((state) => state.adminAuth);

    if (admin) {
        return (
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Welcome back, {admin.name}! 👋
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    You are logged in as <span className="font-semibold text-blue-600 dark:text-blue-400">{getAdminRoleDisplay(admin.role)}</span>. Here's what's happening with your admin dashboard today.
                </p>
            </div>
        );
    }

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
