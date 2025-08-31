import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bell } from "lucide-react";

const NotificationPreferences = ({
    notifications,
    setNotifications,
    emailNotifications,
    setEmailNotifications,
    smsNotifications,
    setSmsNotifications
}) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                        <CardTitle>Notification Preferences</CardTitle>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Configure how you receive notifications
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
                    <div className="flex-1">
                        <label className="text-sm font-medium text-slate-900 dark:text-white">
                            Push Notifications
                        </label>
                    </div>
                    <div className="ml-4">
                        <Switch
                            checked={notifications}
                            onCheckedChange={setNotifications}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
                    <div className="flex-1">
                        <label className="text-sm font-medium text-slate-900 dark:text-white">
                            Email Notifications
                        </label>
                    </div>
                    <div className="ml-4">
                        <Switch
                            checked={emailNotifications}
                            onCheckedChange={setEmailNotifications}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
                    <div className="flex-1">
                        <label className="text-sm font-medium text-slate-900 dark:text-white">
                            SMS Notifications
                        </label>
                    </div>
                    <div className="ml-4">
                        <Switch
                            checked={smsNotifications}
                            onCheckedChange={setSmsNotifications}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default NotificationPreferences;
