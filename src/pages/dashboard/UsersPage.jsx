import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Users,
    Search,
    Plus,
    Filter,
    MoreHorizontal,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Eye,
    Edit,
    Trash2,
    UserPlus,
    Download
} from "lucide-react";

const UsersPage = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const users = [
        {
            id: 1,
            name: "Olivia Martin",
            email: "olivia.martin@email.com",
            role: "Admin",
            status: "Active",
            lastActive: "2 hours ago",
            avatar: "OM",
            phone: "+1 (555) 123-4567",
            location: "New York, NY"
        },
        {
            id: 2,
            name: "Jackson Lee",
            email: "jackson.lee@email.com",
            role: "User",
            status: "Active",
            lastActive: "1 day ago",
            avatar: "JL",
            phone: "+1 (555) 234-5678",
            location: "Los Angeles, CA"
        },
        {
            id: 3,
            name: "Isabella Nguyen",
            email: "isabella.nguyen@email.com",
            role: "Moderator",
            status: "Inactive",
            lastActive: "3 days ago",
            avatar: "IN",
            phone: "+1 (555) 345-6789",
            location: "Chicago, IL"
        },
        {
            id: 4,
            name: "William Kim",
            email: "will@email.com",
            role: "User",
            status: "Active",
            lastActive: "5 hours ago",
            avatar: "WK",
            phone: "+1 (555) 456-7890",
            location: "Houston, TX"
        },
        {
            id: 5,
            name: "Sarah Wilson",
            email: "sarah.wilson@email.com",
            role: "User",
            status: "Active",
            lastActive: "1 hour ago",
            avatar: "SW",
            phone: "+1 (555) 567-8901",
            location: "Phoenix, AZ"
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "Active":
                return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
            case "Inactive":
                return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
            case "Pending":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
        }
    };

    const getRoleColor = (role) => {
        switch (role) {
            case "Admin":
                return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
            case "Moderator":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
            case "User":
                return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Users Management
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Manage your users, roles, and permissions.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                    Total Users
                                </p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {users.length}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                <Users className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                    Active Users
                                </p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {users.filter(user => user.status === "Active").length}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                                <Users className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                    Admins
                                </p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {users.filter(user => user.role === "Admin").length}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                                <Users className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                    New This Month
                                </p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                    12
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Actions Bar */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="flex items-center space-x-4 flex-1">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                                />
                            </div>
                            <Button variant="outline" size="sm">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter
                            </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Export
                            </Button>
                            <Button size="sm">
                                <Plus className="mr-2 h-4 w-4" />
                                Add User
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {filteredUsers.map((user) => (
                            <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                        {user.avatar}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <p className="font-medium text-slate-900 dark:text-white">
                                                {user.name}
                                            </p>
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(user.status)}`}>
                                                {user.status}
                                            </span>
                                            <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(user.role)}`}>
                                                {user.role}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                                            <div className="flex items-center space-x-1">
                                                <Mail className="h-3 w-3" />
                                                <span>{user.email}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Phone className="h-3 w-3" />
                                                <span>{user.phone}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <MapPin className="h-3 w-3" />
                                                <span>{user.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="text-right">
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            Last active
                                        </p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                                            {user.lastActive}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Button variant="ghost" size="icon">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <UserPlus className="h-5 w-5" />
                            <span>Invite Users</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            Send invitations to new users to join your platform.
                        </p>
                        <Button className="w-full">
                            <Mail className="mr-2 h-4 w-4" />
                            Send Invitations
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Users className="h-5 w-5" />
                            <span>Bulk Actions</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            Perform actions on multiple users at once.
                        </p>
                        <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Selected
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Selected
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Calendar className="h-5 w-5" />
                            <span>Recent Activity</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        New user registered
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        2 minutes ago
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        User role updated
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        1 hour ago
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        User deactivated
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        3 hours ago
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default UsersPage;
