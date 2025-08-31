import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import {
    Home,
    Users,
    BookOpen,
    Settings,
    BarChart3,
    FileText,
    Calendar,
    Mail,
    User,
    LogOut,
    X,
    Bell,
    ListChecks,
    UserRoundCog,
    Layers,
    ClipboardList,
    CheckSquare,
    Star,
    GraduationCap,
    MessageSquare,
    Upload,
    Eye
} from "lucide-react";
import logo from "@/assets/icons/colorlogo.png";
import { adminLoggedOut } from "@/features/adminauth/adminAuthSlice";
import { clearTokens } from "@/hooks/useToken";
import { getAccessibleRoutes, getAdminRoleDisplay } from "@/lib/enums";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { admin, isAuthenticated } = useSelector((state) => state.adminAuth);

    // Get accessible routes based on admin role
    const accessibleRoutes = admin?.role ? getAccessibleRoutes(admin.role) : [];

    const handleLogout = () => {
        if (admin) {
            dispatch(adminLoggedOut());
            clearTokens();
            toast.success('Admin logged out successfully');
            navigate('/admin/login');
        } else {
            // Handle regular user logout if needed
            toast.success('Logged out successfully');
            navigate('/sign-in');
        }
    };

    const navigationItems = [
        { icon: Home, label: "Dashboard", href: "/", routeId: "dashboard" },
        { icon: BarChart3, label: "Analytics", href: "/analytics", routeId: "analytics" },
        { icon: Users, label: "Users", href: "/users", routeId: "user" },
        { icon: UserRoundCog, label: "Instructors", href: "/instructors", routeId: "instructor" },
        { icon: GraduationCap, label: "Enrollments", href: "/enrollments", routeId: "enrollment" },
        { icon: ListChecks, label: "Categories", href: "/categories", routeId: "categories" },
        { icon: BookOpen, label: "Courses", href: "/courses", routeId: "courses" },
        { icon: Layers, label: "Modules", href: "/modules", routeId: "modules" },
        { icon: FileText, label: "Lessons", href: "/lessons", routeId: "lessons" },
        { icon: ClipboardList, label: "Assignments", href: "/assignments", routeId: "assignments" },
        { icon: CheckSquare, label: "Submissions", href: "/assignment-submissions", routeId: "assignment-submissions" },
        { icon: Star, label: "Reviews", href: "/reviews", routeId: "reviews" },
        { icon: MessageSquare, label: "Support Tickets", href: "/support-tickets", routeId: "support-tickets" },
        { icon: Bell, label: "Notifications", href: "/notifications", routeId: "notifications" },
        { icon: Settings, label: "Settings", href: "/settings", routeId: "settings" },
    ];

    // Filter navigation items based on admin role if admin is logged in
    const filteredNavigationItems = admin?.role
        ? navigationItems.filter(item =>
            accessibleRoutes.includes(item.routeId) || item.routeId === 'settings'
        )
        : navigationItems;

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
        transform transition-transform duration-300 ease-in-out z-50 flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <Link to="/">
                        <div className="flex items-center space-x-2">
                            <img src={logo} alt="logo" />
                        </div>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleSidebar}
                        className="lg:hidden"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Navigation - Scrollable */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    {filteredNavigationItems.map((item) => (
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
                <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                        <Link to="/settings">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <img src={admin.photoUrl} alt="Admin" className="w-full h-full rounded-full object-cover" />
                            </div>
                        </Link>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                {admin ? admin.name : "Admin User"}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                {admin ? admin.email : "admin@nextbyte.com"}
                                {admin && (
                                    <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                        {getAdminRoleDisplay(admin.role)}
                                    </span>
                                )}
                            </p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={handleLogout}>
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Sidebar;
