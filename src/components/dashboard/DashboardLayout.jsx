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
        if (path === "/") return "Dashboard";
        if (path === "/users") return "Users Management";
        if (path === "/analytics") return "Analytics";
        if (path === "/reports") return "Reports";
        if (path === "/calendar") return "Calendar";
        if (path === "/messages") return "Messages";
        if (path === "/settings") return "Settings";
        if (path === "/assignments") return "Assignments";
        if (path === "/courses") return "Courses";
        if (path === "/enrollments") return "Enrollments Management";
        if (path === "/manual-payment") return "Manual Payment";
        if (path === "/modules") return "Modules";
        if (path === "/lessons") return "Lessons";
        if (path === "/instructors") return "Instructors";
        if (path === "/categories") return "Categories";
        if (path === "/support-tickets") return "Support Tickets";
        if (path === "/notifications") return "Notifications";
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
