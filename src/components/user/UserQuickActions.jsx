import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    UserPlus,
    Users,
    Calendar,
    Mail,
    Edit,
    ToggleRight,
    ToggleLeft,
    GraduationCap,
    Trash2
} from "lucide-react";

const UserQuickActions = () => {
    return (
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
                            <ToggleRight className="mr-2 h-4 w-4" />
                            Activate Selected
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                            <ToggleLeft className="mr-2 h-4 w-4" />
                            Deactivate Selected
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                            <GraduationCap className="mr-2 h-4 w-4" />
                            View Enrollments
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
                                    User verified
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    1 hour ago
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                    User banned
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
    );
};

export default UserQuickActions;
