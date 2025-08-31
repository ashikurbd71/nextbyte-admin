import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// components
import SubmitButton from "@/components/buttons/SubmitButton";
import TextField from "@/components/input/TextField";
import AuthPage from "..";

// hooks and function
import { useForgotPasswordMutation } from "@/features/auth/authApiSlice";

// icons
import { letter } from "@/assets/icons/svgIcons";

const ForgotPasswordRequestPage = () => {
  const navigate = useNavigate();

  const { handleSubmit, register, formState: { errors } } = useForm();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit = async (data) => {
    const res = await forgotPassword(data);
    if (res && res?.data?.success) {
      toast.success(res?.error?.data?.message || "Reset Link sent success!");
      navigate("/forgot-password/check-email");
    } else {
      toast.error(res?.error?.data?.message || "Reset Link Sent Failed!");
    }
  };

  return (
    <AuthPage title="Forgot Password" subtitle="Enter your email to receive a reset link">
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
            disabled={isLoading}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
          />
          {errors.email && (
            <p className="text-sm text-red-600 dark:text-red-400">
              Please enter a valid email address
            </p>
          )}
        </div>

        {/* Information Box */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <p className="font-medium">Reset Instructions</p>
              <p className="mt-1">We'll send you an email with a link to reset your password.</p>
            </div>
          </div>
        </div>

        {/* Send Reset Link Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Sending email...</span>
            </div>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>

      {/* Back to Sign In */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Remember your password?{" "}
          <Link
            to="/sign-in"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-200"
          >
            Back to sign in
          </Link>
        </p>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="flex justify-center space-x-4">
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

export default ForgotPasswordRequestPage;
