import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// components
import SubmitButton from "@/components/buttons/SubmitButton";
import TextField from "@/components/input/TextField";
import Checkbox from "@/components/input/Checkbox";
import AuthPage from "..";

// hooks and function
import { useAdminLoginMutation } from "@/features/adminauth/adminauth";
import { adminLoggedIn } from "@/features/adminauth/adminAuthSlice";
import { setSessionToken } from "@/hooks/useToken";

// icons
import { letter, password } from "@/assets/icons/svgIcons";

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [rememberMe, setRememberMe] = useState(false);

    const [adminLogin, { isLoading: loginLoading }] = useAdminLoginMutation();

    // Handle successful authentication
    const handleAuthSuccess = (admin, token) => {
        console.log('Dispatching adminLoggedIn with:', { admin, token });
        dispatch(adminLoggedIn({ admin, token }));

        // Store token in session storage (using same token for both access and refresh)
        setSessionToken(token, token);

        // Also store in localStorage for persistence
        try {
            localStorage.setItem('adminData', JSON.stringify(admin));
            localStorage.setItem('adminToken', token);
        } catch (error) {
            console.error('Error storing in localStorage:', error);
            // Fallback to sessionStorage only
            sessionStorage.setItem('adminData', JSON.stringify(admin));
            sessionStorage.setItem('adminToken', token);
        }

        console.log('Token stored:', token);
        console.log('Admin data stored:', admin);

        // Verify storage was set correctly
        const storedAdminData = localStorage.getItem('adminData') || sessionStorage.getItem('adminData');
        const storedToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
        console.log('Verified stored admin data:', storedAdminData);
        console.log('Verified stored token:', storedToken);

        toast.success("Admin login successful!");
        navigate("/");
    };

    const onSubmit = async (data) => {
        try {
            const loginRes = await adminLogin(data);

            console.log("Full login response:", loginRes);

            if (loginRes?.data?.statusCode === 200) {
                console.log("Login response:", loginRes.data);

                // Handle different possible response structures
                let adminData, token;

                if (loginRes.data.data) {
                    // If admin data is nested in data.data
                    adminData = loginRes.data.data;
                    token = loginRes.data.token || loginRes.data.data.token;
                } else {
                    // If admin data is directly in data
                    adminData = loginRes.data;
                    token = loginRes.data.token;
                }

                // Check if adminData has an admin property and extract it
                if (adminData && adminData.admin) {
                    adminData = adminData.admin;
                }

                console.log("Extracted admin data:", adminData);
                console.log("Extracted token:", token);

                if (!adminData) {
                    toast.error("Admin data not found in response!");
                    return;
                }

                if (!token) {
                    toast.error("Token not found in response!");
                    return;
                }

                handleAuthSuccess(adminData, token);
            } else {
                console.error("Login failed:", loginRes);
                toast.error(loginRes?.error?.data?.message || "Admin login failed!");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <AuthPage title="Admin Login" subtitle="Access the admin dashboard">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >
                {/* Email Field */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Address
                    </label>
                    <TextField
                        placeholder="Enter your email address"
                        type="email"
                        register={register}
                        name="email"
                        icon={letter}
                        disabled={loginLoading}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                            Please enter a valid email address
                        </p>
                    )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                    </label>
                    <TextField
                        placeholder="Enter your password"
                        register={register}
                        name="password"
                        type="password"
                        icon={password}
                        disabled={loginLoading}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                    />
                    {errors.password && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                            Password is required
                        </p>
                    )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                    <Checkbox
                        name="rememberMe"
                        value={rememberMe}
                        setValue={setRememberMe}
                    >
                        <span className="text-sm text-gray-700 dark:text-gray-300">Remember me</span>
                    </Checkbox>
                    <button
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                    >
                        Forgot password?
                    </button>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {loginLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Signing in...</span>
                        </div>
                    ) : (
                        "Sign In to Dashboard"
                    )}
                </button>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="text-sm text-blue-800 dark:text-blue-200">
                            <p className="font-medium">Secure Access</p>
                            <p className="mt-1">This is a secure admin portal. Please ensure you're on the correct domain.</p>
                        </div>
                    </div>
                </div>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Need help? Contact system administrator
                    </p>
                    <div className="mt-2 flex justify-center space-x-4">
                        <button className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200">
                            Privacy Policy
                        </button>
                        <button className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200">
                            Terms of Service
                        </button>
                    </div>
                </div>
            </div>
        </AuthPage>
    );
};

export default AdminLoginPage;
