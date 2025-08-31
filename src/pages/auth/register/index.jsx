import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import toast from "react-hot-toast";

import SubmitButton from "@/components/buttons/SubmitButton";
import TextField from "@/components/input/TextField";
import Checkbox from "@/components/input/Checkbox";

import { useUserRegisterMutation } from "@/features/auth/authApiSlice";
import AuthPage from "..";
import { letter, password, soundwave, user } from "@/assets/icons/svgIcons";

const RegisterPage = () => {
  const [searchParams] = useSearchParams();

  const campaign = searchParams.get("campaign");
  const referId = searchParams.get("referId");

  const { handleSubmit, register, formState: { errors }, watch } = useForm();
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const navigate = useNavigate();

  const [userRegister, { isLoading }] = useUserRegisterMutation();

  const password = watch("password");

  const onSubmit = async (data) => {
    const bodyData = data;
    if (campaign) {
      bodyData.campaign = campaign;
    }
    if (referId) {
      bodyData.referId = referId;
      bodyData.page = "sign-up";
    }
    const res = await userRegister(bodyData);
    if (res && res.data?.success) {
      toast.success(
        res.data?.data?.message || "You are Successfully Registered."
      );
      navigate("/create-account/verify-email");
    } else {
      toast.error(
        res?.error?.data?.message || "Sorry! A Network Error Occured!"
      );
    }
  };

  return (
    <AuthPage title="Create Account" subtitle="Join us and start your learning journey">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Full Name Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <TextField
            placeholder="Enter your full name"
            register={register}
            name="fullName"
            icon={user}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
          />
          {errors.fullName && (
            <p className="text-sm text-red-600 dark:text-red-400">
              Full name is required
            </p>
          )}
        </div>

        {/* Username Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Username
          </label>
          <TextField
            placeholder="Choose a username"
            register={register}
            name="userName"
            icon={soundwave}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
          />
          {errors.userName && (
            <p className="text-sm text-red-600 dark:text-red-400">
              Username is required
            </p>
          )}
        </div>

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
            placeholder="Create a strong password"
            type="password"
            register={register}
            name="password"
            icon={password}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
          />
          {errors.password && (
            <p className="text-sm text-red-600 dark:text-red-400">
              Password must be at least 8 characters
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>
          <TextField
            placeholder="Confirm your password"
            type="password"
            register={register}
            name="confirmPassword"
            icon={password}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600 dark:text-red-400">
              Passwords do not match
            </p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Checkbox
              name="policy"
              value={acceptedPolicy}
              setValue={setAcceptedPolicy}
            />
            <div className="text-sm text-gray-700 dark:text-gray-300">
              I agree to the{" "}
              <Link
                to="/privacy-policy"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-200"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                to="/terms-of-conditions"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Create Account Button */}
        <button
          type="submit"
          disabled={!acceptedPolicy || isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating account...</span>
            </div>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      {/* Sign In Link */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-200"
          >
            Sign in
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

export default RegisterPage;
