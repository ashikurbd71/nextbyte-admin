import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

// Components
import {
    ProfileInformation,
    NotificationPreferences,
    SecuritySettings,
    AppearanceSettings,
    PasswordChangeModal
} from "@/components/settings";

// Custom hook
import { useSettings } from "@/hooks/useSettings";

const SettingsPage = () => {
    const {
        // State
        admin,
        darkMode,
        setDarkMode,
        notifications,
        setNotifications,
        emailNotifications,
        setEmailNotifications,
        smsNotifications,
        setSmsNotifications,
        twoFactorAuth,
        setTwoFactorAuth,
        profileData,
        expertiseInput,
        setExpertiseInput,
        errors,
        showPasswordModal,
        setShowPasswordModal,
        passwordData,
        showPasswords,
        updateLoading,
        passwordLoading,

        // Actions
        handleProfileChange,
        addExpertise,
        removeExpertise,
        handlePasswordChange,
        togglePasswordVisibility,
        handleSaveProfile,
        handleChangePassword
    } = useSettings();

    // Add a check to ensure admin data is available
    useEffect(() => {
        if (!admin) {
            console.log("No admin data found in Redux store");
            // You might want to redirect to login or fetch admin data
        } else {
            console.log("Admin data found:", admin);
        }
    }, [admin]);

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

            {/* Profile Information */}
            <ProfileInformation
                profileData={profileData}
                errors={errors}
                expertiseInput={expertiseInput}
                setExpertiseInput={setExpertiseInput}
                handleProfileChange={handleProfileChange}
                addExpertise={addExpertise}
                removeExpertise={removeExpertise}
            />

            {/* Notification Preferences */}
            {/* <NotificationPreferences
                notifications={notifications}
                setNotifications={setNotifications}
                emailNotifications={emailNotifications}
                setEmailNotifications={setEmailNotifications}
                smsNotifications={smsNotifications}
                setSmsNotifications={setSmsNotifications}
            /> */}

            {/* Security Settings */}
            <SecuritySettings
                twoFactorAuth={twoFactorAuth}
                setTwoFactorAuth={setTwoFactorAuth}
                setShowPasswordModal={setShowPasswordModal}
            />

            {/* Appearance Settings */}
            {/* <AppearanceSettings
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            /> */}

            {/* Save Button */}
            <div className="flex justify-end">
                <Button
                    className="flex items-center space-x-2"
                    onClick={handleSaveProfile}
                    disabled={updateLoading}
                >
                    {updateLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                        <Save className="h-4 w-4" />
                    )}
                    <span>{updateLoading ? "Saving..." : "Save Changes"}</span>
                </Button>
            </div>

            {/* Password Change Modal */}
            <PasswordChangeModal
                showPasswordModal={showPasswordModal}
                setShowPasswordModal={setShowPasswordModal}
                passwordData={passwordData}
                handlePasswordChange={handlePasswordChange}
                showPasswords={showPasswords}
                togglePasswordVisibility={togglePasswordVisibility}
                handleChangePassword={handleChangePassword}
                passwordLoading={passwordLoading}
            />
        </div>
    );
};

export default SettingsPage;
