import { Button } from "@/components/ui/button";
import {
    Bell,
    Search,
    Menu,
    User
} from "lucide-react";

const Navbar = ({ toggleSidebar, pageTitle = "Dashboard" }) => {
    return (
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-30">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleSidebar}
                        className="lg:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {pageTitle}
                    </h1>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Notifications */}
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                    </Button>

                    {/* Profile */}
                    <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
