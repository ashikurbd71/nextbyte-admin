import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// components
import SubmitButton from "@/components/buttons/SubmitButton";
import TextField from "@/components/input/TextField";
import Checkbox from "@/components/input/Checkbox";
import AuthPage from "..";

// hooks and function
import {
  useUserLoginMutation,
  // useVerifyRegistrationMutation,
} from "@/features/auth/authApiSlice";
import { userLoggedIn } from "@/features/auth/authSlice";

// icons
import { letter, password } from "@/assets/icons/svgIcons";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { handleSubmit, register, formState: { errors } } = useForm();

  const [rememberMe, setRememberMe] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [userLogin, { isLoading: loginLoading }] = useUserLoginMutation();
  // const [verifyRegistration, { isLoading: verifyLoading }] =
  //   useVerifyRegistrationMutation();

  // Handle successful authentication
  const handleAuthSuccess = (accessToken, refreshToken) => {
    dispatch(userLoggedIn({ accessToken, refreshToken, rememberMe }));
    toast.success("You are Successfully Logged In.");
    navigate("/");
  };

  const onSubmit = async (data) => {
    try {
      if (token && email && email === data?.email) {
        // const verifyRes = await verifyRegistration({ token, email });

        // if (!verifyRes?.data?.success) {
        //   toast.error(verifyRes?.data?.error || "Verification Failed!");
        //   return;
        // }

        const loginRes = await userLogin(data);

        if (loginRes?.data?.success) {
          handleAuthSuccess(
            loginRes.data?.data?.accessToken,
            loginRes.data?.data?.refreshToken
          );
        } else {
          toast.error(loginRes?.error?.data?.message || "Login Failed!");
        }
      } else {
        const loginRes = await userLogin(data);

        if (loginRes?.data?.success) {
          handleAuthSuccess(
            loginRes.data?.data?.accessToken,
            loginRes.data?.data?.refreshToken
          );
        } else {
          toast.error(loginRes?.error?.data?.message || "Login Failed!");
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const isLoading = loginLoading;
  //  || verifyLoading;

  return (
    <AuthPage title="Welcome Back" subtitle="Sign in to your account">
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
            defaultValue={email || ""}
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
            disabled={isLoading}
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
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-200"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Signing in...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-200"
          >
            Create a new account
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

export default LoginPage;
