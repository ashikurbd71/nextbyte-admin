import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Palette } from "lucide-react";

const AppearanceSettings = ({ darkMode, setDarkMode }) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <Palette className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                        <CardTitle>Appearance</CardTitle>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Customize the look and feel of your dashboard
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
                    <div className="flex-1">
                        <label className="text-sm font-medium text-slate-900 dark:text-white">
                            Dark Mode
                        </label>
                    </div>
                    <div className="ml-4">
                        <Switch
                            checked={darkMode}
                            onCheckedChange={setDarkMode}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
                    <div className="flex-1">
                        <label className="text-sm font-medium text-slate-900 dark:text-white">
                            Language
                        </label>
                    </div>
                    <div className="ml-4">
                        <select className="w-64 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
                    <div className="flex-1">
                        <label className="text-sm font-medium text-slate-900 dark:text-white">
                            Time Zone
                        </label>
                    </div>
                    <div className="ml-4">
                        <select className="w-64 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option>UTC-8 (Pacific Time)</option>
                            <option>UTC-5 (Eastern Time)</option>
                            <option>UTC+0 (GMT)</option>
                            <option>UTC+1 (Central European Time)</option>
                        </select>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AppearanceSettings;
