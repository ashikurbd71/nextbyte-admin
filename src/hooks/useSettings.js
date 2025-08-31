import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAdminProfile } from "@/features/adminauth/adminAuthSlice";
import { useUpdateAdminProfileMutation, useChangeAdminPasswordMutation } from "@/features/adminauth/adminauth";
import toast from "react-hot-toast";

export const useSettings = () => {
    const dispatch = useDispatch();
    const { admin } = useSelector((state) => state.adminAuth);

    // API mutations
    const [updateProfile, { isLoading: updateLoading }] = useUpdateAdminProfileMutation();
    const [changePassword, { isLoading: passwordLoading }] = useChangeAdminPasswordMutation();

    // State management
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [twoFactorAuth, setTwoFactorAuth] = useState(true);

    // Profile form state
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        bio: "",
        designation: "",
        experience: "",
        fbLink: "",
        linkedinLink: "",
        instaLink: "",
        expertise: [],
        salary: "",
        jobType: "",
        photoUrl: "",
        role: ""
    });

    // Expertise input state
    const [expertiseInput, setExpertiseInput] = useState("");
    const [errors, setErrors] = useState({});

    // Password change state
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    // Initialize profile data from Redux store
    useEffect(() => {
        if (admin) {
            console.log("Admin data from Redux:", admin);
            setProfileData({
                name: admin.name || "",
                email: admin.email || "",
                bio: admin.bio || "",
                designation: admin.designation || "",
                experience: admin.experience?.toString() || "",
                fbLink: admin.fbLink || "",
                linkedinLink: admin.linkedinLink || "",
                instaLink: admin.instaLink || "",
                expertise: admin.expertise || [],
                salary: admin.salary?.toString() || "",
                jobType: admin.jobType || "",
                photoUrl: admin.photoUrl || "",
                role: admin.role || ""
            });
        }
    }, [admin]);

    // Handle profile data changes
    const handleProfileChange = (field, value) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    // Handle expertise tags
    const addExpertise = () => {
        if (expertiseInput.trim() && !profileData.expertise.includes(expertiseInput.trim())) {
            setProfileData(prev => ({
                ...prev,
                expertise: [...prev.expertise, expertiseInput.trim()]
            }));
            setExpertiseInput("");
        }
    };

    const removeExpertise = (index) => {
        setProfileData(prev => ({
            ...prev,
            expertise: prev.expertise.filter((_, i) => i !== index)
        }));
    };

    // Handle password data changes
    const handlePasswordChange = (field, value) => {
        setPasswordData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Toggle password visibility
    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    // Validation
    const validateForm = () => {
        const newErrors = {};

        if (!profileData.name.trim()) newErrors.name = "Name is required";
        if (!profileData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(profileData.email)) newErrors.email = "Email is invalid";

        if (!profileData.designation.trim()) newErrors.designation = "Designation is required";
        if (!profileData.experience) newErrors.experience = "Experience is required";
        if (!profileData.salary) newErrors.salary = "Salary is required";
        if (!profileData.jobType) newErrors.jobType = "Job type is required";
        if (!profileData.role) newErrors.role = "Role is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Save profile changes
    const handleSaveProfile = async () => {
        if (!validateForm()) {
            toast.error("Please fix the errors in the form");
            return;
        }

        if (!admin?.id) {
            console.error("Admin ID not found. Admin data:", admin);
            toast.error("Admin ID not found. Please log in again.");
            return;
        }

        try {
            const submitData = {
                ...profileData,
                experience: parseInt(profileData.experience),
                salary: parseFloat(profileData.salary)
            };

            console.log("Updating profile with ID:", admin.id);
            const response = await updateProfile({
                id: admin.id,
                data: submitData
            });

            if (response.data?.statusCode === 200) {
                // Update Redux store
                dispatch(updateAdminProfile(submitData));
                toast.success("Profile updated successfully!");
            } else {
                toast.error(response.error?.data?.message || "Failed to update profile");
            }
        } catch (error) {
            toast.error("An error occurred while updating profile");
        }
    };

    // Change password
    const handleChangePassword = async () => {
        // Validation
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }

        if (passwordData.newPassword.length < 6) {
            toast.error("New password must be at least 6 characters long");
            return;
        }

        if (!admin?.id) {
            console.error("Admin ID not found. Admin data:", admin);
            toast.error("Admin ID not found. Please log in again.");
            return;
        }

        try {
            console.log("Changing password with ID:", admin.id);
            const response = await changePassword({
                id: admin.id,
                data: {
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                }
            });

            if (response.data?.statusCode === 200) {
                toast.success("Password changed successfully!");
                setShowPasswordModal(false);
                setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                });
            } else {
                toast.error(response.error?.data?.message || "Failed to change password");
            }
        } catch (error) {
            toast.error("An error occurred while changing password");
        }
    };

    return {
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
    };
};
