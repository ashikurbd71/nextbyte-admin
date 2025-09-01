import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Shield } from "lucide-react";
import toast from "react-hot-toast";

const SecuritySettings = ({
    twoFactorAuth,
    setTwoFactorAuth,
    setShowPasswordModal
}) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <Shield className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                        <CardTitle>Security Settings</CardTitle>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Manage your account security and privacy
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
                    <div className="flex-1">
                        <label className="text-sm font-medium text-slate-900 dark:text-white">
                            Two-Factor Authentication
                        </label>
                    </div>
                    <div className="ml-4">
                        <Switch
                            checked={twoFactorAuth}
                            onCheckedChange={setTwoFactorAuth}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
                    <div className="flex-1">
                        <label className="text-sm font-medium text-slate-900 dark:text-white">
                            Change Password
                        </label>
                    </div>
                    <div className="ml-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowPasswordModal(true)}
                        >
                            Change Password
                        </Button>
                    </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
                    <div className="flex-1">
                        <label className="text-sm font-medium text-slate-900 dark:text-white">
                            Login History
                        </label>
                    </div>
                    <div className="ml-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toast.info("Login history feature coming soon!")}
                        >
                            View History
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SecuritySettings;
