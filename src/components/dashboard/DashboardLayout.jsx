import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Get page title based on current route
    const getPageTitle = () => {
        const path = location.pathname;
        if (path === "/dashboard") return "Dashboard";
        if (path === "/dashboard/users") return "Users Management";
        if (path === "/dashboard/analytics") return "Analytics";
        if (path === "/dashboard/reports") return "Reports";
        if (path === "/dashboard/calendar") return "Calendar";
        if (path === "/dashboard/messages") return "Messages";
        if (path === "/dashboard/settings") return "Settings";
        return "Dashboard";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            {/* Sidebar Component */}
            <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div className="lg:ml-64 min-h-screen">
                {/* Navbar Component */}
                <Navbar toggleSidebar={toggleSidebar} pageTitle={getPageTitle()} />

                {/* Page Content */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
