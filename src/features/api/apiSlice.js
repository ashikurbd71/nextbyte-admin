import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  adminLoggedIn,
  adminLoggedOut,
} from "@/features/adminauth/adminAuthSlice";
import { getTokens } from "@/hooks/useToken";

const BASE_URL = 'https://server.private.nextbyteitinstitute.com';

// base fetch query
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const { accessToken } = getTokens();
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

// Middleware to clear cache when user changes
const customMiddleware = (api) => (next) => (action) => {
  if (action.type === "adminauth/adminLoggedIn") {
    api.dispatch(api.util.resetApiState());
  }
  return next(action);
};

// main api slice
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQuery, // refresh token নাই, তাই শুধু baseQuery ব্যবহার করছি
  tagTypes: [
    "auth",
    "dashboard",
    "earnings-report",
    "dashboard-mark",
    "users",
    "notifications",
    "courses",
    "course-statistics",
    "course",
    "categories",
    "category",
    "lessons",
    "lesson-statistics",
    "lesson",
    "modules",
    "module-statistics",
    "module",
    "assignments",
    "assignment-statistics",
    "assignment",
    "module-assignments",
    "assignment-submissions",
    "assignment-submission",
    "student-performance",
    "student-submissions",
    "status-submissions",
    "pending-submissions",
    "reviewed-submissions",
    "submission-statistics",
    "enrollments",
    "enrollment",
    "enrollment-statistics",
    "student-enrollments",
    "course-enrollments",
    "enrollment-progress",
    "support-tickets",
    "support-ticket",
    "support-ticket-statistics",
    "mentors",
  ],
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({}),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customMiddleware),
});

// Export utility functions for cache management
export const {
  util: { resetApiState },
} = apiSlice;

export const setupApiSlice = (store) => {
  store.subscribe(() => {
    const state = store.getState();
    if (!state.adminAuth.isAuthenticated) {
      store.dispatch(resetApiState());
    }
  });
};
