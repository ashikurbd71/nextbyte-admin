import React from "react";

const AuthPage = ({ title, subtitle, children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        {subtitle}
                    </p>
                </div>

                {/* Auth Form Container */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
                    {children}
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Secure admin access portal
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
