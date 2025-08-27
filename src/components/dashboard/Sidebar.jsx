import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Home,
    Users,
    Settings,
    BarChart3,
    FileText,
    Calendar,
    Mail,
    User,
    LogOut,
    X
} from "lucide-react";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
    const location = useLocation();

    const navigationItems = [
        { icon: Home, label: "Dashboard", href: "/" },
        { icon: Users, label: "Users", href: "/users" },
        { icon: BarChart3, label: "Analytics", href: "/analytics" },
        { icon: FileText, label: "Reports", href: "/reports" },
        { icon: Calendar, label: "Calendar", href: "/calendar" },
        { icon: Mail, label: "Messages", href: "/messages" },
        { icon: Settings, label: "Settings", href: "/settings" },
    ];

    const isActive = (href) => {
        if (href === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(href);
    };

    return (
        <>
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 
        transform transition-transform duration-300 ease-in-out z-50
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">N</span>
                        </div>
                        <span className="text-xl font-bold text-slate-900 dark:text-white">NextByte</span>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleSidebar}
                        className="lg:hidden"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.href}
                            className={`
                flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                ${isActive(item.href)
                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                }
              `}
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* User Profile Section */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                Admin User
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                admin@nextbyte.com
                            </p>
                        </div>
                        <Button variant="ghost" size="icon">
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
