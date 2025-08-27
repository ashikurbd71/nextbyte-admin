import React from "react";
import "./loader.css";

const Loader = ({
    variant = "spinner",
    size = "md",
    className = "",
    text = "",
    fullScreen = false
}) => {
    const sizeClasses = {
        xs: "w-3 h-3",
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-12 h-12"
    };

    const getLoaderContent = () => {
        switch (variant) {
            case "dots":
                return (
                    <div className={`flex space-x-1 ${sizeClasses[size]}`}>
                        <div className="w-1 h-1 bg-current rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                );

            case "pulse":
                return (
                    <div className={`${sizeClasses[size]} bg-current rounded-full animate-pulse`}></div>
                );

            case "ring":
                return (
                    <div className={`${sizeClasses[size]} border-2 border-current border-t-transparent rounded-full animate-spin`}></div>
                );

            case "bars":
                return (
                    <div className={`flex space-x-1 ${sizeClasses[size]}`}>
                        <div className="w-1 bg-current animate-pulse"></div>
                        <div className="w-1 bg-current animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 bg-current animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1 bg-current animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                );

            case "atom":
                return <span className={`loader ${sizeClasses[size]} ${className}`}></span>;

            case "spinner":
            default:
                return <div className={`spinner ${sizeClasses[size]} ${className}`}></div>;
        }
    };

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    {getLoaderContent()}
                    {text && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 animate-pulse">
                            {text}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center space-y-2">
            {getLoaderContent()}
            {text && (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    {text}
                </p>
            )}
        </div>
    );
};

export default Loader;
