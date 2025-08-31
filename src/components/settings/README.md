# Settings Components

This directory contains the modular components for the Settings page, providing a well-structured and maintainable codebase.

## Components Overview

### 1. ProfileInformation.jsx

Handles the profile information section including:

- Basic information (name, email, designation, experience)
- Role and job type selection
- Bio and expertise management
- Social media links
- Profile photo upload

**Props:**

- `profileData` - Object containing all profile information
- `errors` - Object containing validation errors
- `expertiseInput` - String for expertise input field
- `setExpertiseInput` - Function to update expertise input
- `handleProfileChange` - Function to handle profile field changes
- `addExpertise` - Function to add new expertise
- `removeExpertise` - Function to remove expertise

### 2. NotificationPreferences.jsx

Manages notification settings including:

- Push notifications toggle
- Email notifications toggle
- SMS notifications toggle

**Props:**

- `notifications` - Boolean for push notifications
- `setNotifications` - Function to update push notifications
- `emailNotifications` - Boolean for email notifications
- `setEmailNotifications` - Function to update email notifications
- `smsNotifications` - Boolean for SMS notifications
- `setSmsNotifications` - Function to update SMS notifications

### 3. SecuritySettings.jsx

Handles security-related settings including:

- Two-factor authentication toggle
- Change password button
- Login history button

**Props:**

- `twoFactorAuth` - Boolean for 2FA status
- `setTwoFactorAuth` - Function to update 2FA status
- `setShowPasswordModal` - Function to show password change modal

### 4. AppearanceSettings.jsx

Manages appearance preferences including:

- Dark mode toggle
- Language selection
- Time zone selection

**Props:**

- `darkMode` - Boolean for dark mode status
- `setDarkMode` - Function to update dark mode status

### 5. PasswordChangeModal.jsx

Modal component for password change functionality including:

- Current password input
- New password input
- Confirm password input
- Password validation
- Password visibility toggles

**Props:**

- `showPasswordModal` - Boolean to control modal visibility
- `setShowPasswordModal` - Function to update modal visibility
- `passwordData` - Object containing password fields
- `handlePasswordChange` - Function to handle password field changes
- `showPasswords` - Object containing password visibility states
- `togglePasswordVisibility` - Function to toggle password visibility
- `handleChangePassword` - Function to handle password change submission
- `passwordLoading` - Boolean for loading state

## Custom Hook

### useSettings.js

A custom hook that manages all settings state and logic:

**Returns:**

- All state variables (admin, darkMode, notifications, etc.)
- All action functions (handleProfileChange, addExpertise, etc.)
- Loading states (updateLoading, passwordLoading)

**Features:**

- Centralized state management
- API integration with Redux
- Form validation
- Error handling
- Toast notifications

## Usage Example

```jsx
import React from "react";
import { useSettings } from "@/hooks/useSettings";
import {
  ProfileInformation,
  NotificationPreferences,
  SecuritySettings,
  AppearanceSettings,
  PasswordChangeModal,
} from "@/components/settings";

const SettingsPage = () => {
  const {
    // State
    admin,
    profileData,
    errors,
    // ... other state

    // Actions
    handleProfileChange,
    handleSaveProfile,
    // ... other actions
  } = useSettings();

  return (
    <div className="space-y-6">
      <ProfileInformation
        profileData={profileData}
        errors={errors}
        handleProfileChange={handleProfileChange}
        // ... other props
      />

      <NotificationPreferences
        notifications={notifications}
        setNotifications={setNotifications}
        // ... other props
      />

      {/* ... other components */}
    </div>
  );
};
```

## Benefits of This Structure

1. **Modularity**: Each section is a separate component, making the code easier to maintain
2. **Reusability**: Components can be reused in other parts of the application
3. **Testability**: Each component can be tested independently
4. **Separation of Concerns**: UI components are separated from business logic
5. **Maintainability**: Changes to one section don't affect others
6. **Readability**: The main SettingsPage component is now much cleaner and easier to understand

## File Structure

```
src/components/settings/
├── ProfileInformation.jsx
├── NotificationPreferences.jsx
├── SecuritySettings.jsx
├── AppearanceSettings.jsx
├── PasswordChangeModal.jsx
├── index.js
└── README.md
```

## Dependencies

- React
- Lucide React (for icons)
- React Hot Toast (for notifications)
- Redux Toolkit (for state management)
- Custom UI components from `@/components/ui`
- Custom hooks from `@/hooks`
