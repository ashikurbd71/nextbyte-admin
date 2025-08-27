import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
    Settings,
    User,
    Bell,
    Shield,
    Palette,
    Globe,
    Save,
    Moon,
    Sun,
    Eye,
    EyeOff,
    Mail,
    Smartphone,
    Lock
} from "lucide-react";

const SettingsPage = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [twoFactorAuth, setTwoFactorAuth] = useState(true);

    const settingsSections = [
        {
            title: "Profile Settings",
            icon: User,
            description: "Manage your personal information and preferences",
            items: [
                {
                    label: "Full Name",
                    type: "input",
                    value: "Admin User",
                    placeholder: "Enter your full name"
                },
                {
                    label: "Email Address",
                    type: "input",
                    value: "admin@nextbyte.com",
                    placeholder: "Enter your email"
                },
                {
                    label: "Phone Number",
                    type: "input",
                    value: "+1 (555) 123-4567",
                    placeholder: "Enter your phone number"
                },
                {
                    label: "Bio",
                    type: "textarea",
                    value: "Administrator at NextByte",
                    placeholder: "Tell us about yourself"
                }
            ]
        },
        {
            title: "Notification Preferences",
            icon: Bell,
            description: "Configure how you receive notifications",
            items: [
                {
                    label: "Push Notifications",
                    type: "switch",
                    value: notifications,
                    onChange: setNotifications
                },
                {
                    label: "Email Notifications",
                    type: "switch",
                    value: emailNotifications,
                    onChange: setEmailNotifications
                },
                {
                    label: "SMS Notifications",
                    type: "switch",
                    value: smsNotifications,
                    onChange: setSmsNotifications
                }
            ]
        },
        {
            title: "Security Settings",
            icon: Shield,
            description: "Manage your account security and privacy",
            items: [
                {
                    label: "Two-Factor Authentication",
                    type: "switch",
                    value: twoFactorAuth,
                    onChange: setTwoFactorAuth
                },
                {
                    label: "Change Password",
                    type: "button",
                    action: "Change Password"
                },
                {
                    label: "Login History",
                    type: "button",
                    action: "View History"
                }
            ]
        },
        {
            title: "Appearance",
            icon: Palette,
            description: "Customize the look and feel of your dashboard",
            items: [
                {
                    label: "Dark Mode",
                    type: "switch",
                    value: darkMode,
                    onChange: setDarkMode
                },
                {
                    label: "Language",
                    type: "select",
                    value: "English",
                    options: ["English", "Spanish", "French", "German"]
                },
                {
                    label: "Time Zone",
                    type: "select",
                    value: "UTC-5 (Eastern Time)",
                    options: ["UTC-8 (Pacific Time)", "UTC-5 (Eastern Time)", "UTC+0 (GMT)", "UTC+1 (Central European Time)"]
                }
            ]
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Settings
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Manage your account settings and preferences.
                </p>
            </div>

            {/* Settings Sections */}
            <div className="space-y-6">
                {settingsSections.map((section, sectionIndex) => (
                    <Card key={sectionIndex}>
                        <CardHeader>
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                    <section.icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                </div>
                                <div>
                                    <CardTitle>{section.title}</CardTitle>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        {section.description}
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {section.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
                                    <div className="flex-1">
                                        <label className="text-sm font-medium text-slate-900 dark:text-white">
                                            {item.label}
                                        </label>
                                        {item.description && (
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="ml-4">
                                        {item.type === "switch" && (
                                            <Switch
                                                checked={item.value}
                                                onCheckedChange={item.onChange}
                                            />
                                        )}

                                        {item.type === "input" && (
                                            <input
                                                type="text"
                                                value={item.value}
                                                placeholder={item.placeholder}
                                                className="w-64 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        )}

                                        {item.type === "textarea" && (
                                            <textarea
                                                value={item.value}
                                                placeholder={item.placeholder}
                                                rows={3}
                                                className="w-64 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                            />
                                        )}

                                        {item.type === "select" && (
                                            <select
                                                value={item.value}
                                                className="w-64 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                {item.options.map((option, optionIndex) => (
                                                    <option key={optionIndex} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        )}

                                        {item.type === "button" && (
                                            <Button variant="outline" size="sm">
                                                {item.action}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Mail className="h-5 w-5" />
                            <span>Email Preferences</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Marketing emails</span>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Weekly digest</span>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Security alerts</span>
                                <Switch defaultChecked />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Smartphone className="h-5 w-5" />
                            <span>Mobile Settings</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Push notifications</span>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Location services</span>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Biometric login</span>
                                <Switch />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Lock className="h-5 w-5" />
                            <span>Privacy</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Profile visibility</span>
                                <select className="text-sm border border-slate-200 dark:border-slate-700 rounded px-2 py-1 bg-slate-50 dark:bg-slate-800">
                                    <option>Public</option>
                                    <option>Private</option>
                                    <option>Friends only</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Data sharing</span>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Analytics tracking</span>
                                <Switch defaultChecked />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button className="flex items-center space-x-2">
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                </Button>
            </div>
        </div>
    );
};

export default SettingsPage;
