import { createSlice } from "@reduxjs/toolkit";

// Get admin data from localStorage or sessionStorage on initialization
const getStoredAdminData = () => {
    try {
        // Try localStorage first
        let adminData = localStorage.getItem('adminData');
        let adminToken = localStorage.getItem('adminToken');

        // If not in localStorage, try sessionStorage
        if (!adminData || !adminToken) {
            adminData = sessionStorage.getItem('adminData');
            adminToken = sessionStorage.getItem('adminToken');
        }

        return adminData ? { admin: JSON.parse(adminData), token: adminToken } : null;
    } catch (error) {
        return null;
    }
};

const storedData = getStoredAdminData();

const initialState = {
    admin: storedData?.admin || null,
    token: storedData?.token || null,
    isAuthenticated: !!storedData?.admin,
    isLoading: false,
};

const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        adminLoggedIn: (state, action) => {
            const { admin, token } = action.payload;
            state.admin = admin;
            state.token = token;
            state.isAuthenticated = true;
            state.isLoading = false;

            // Store in localStorage with error handling
            try {
                localStorage.setItem('adminData', JSON.stringify(admin));
                localStorage.setItem('adminToken', token);

            } catch (error) {
                console.error('Redux: Error storing in localStorage:', error);
                // Fallback to sessionStorage
                sessionStorage.setItem('adminData', JSON.stringify(admin));
                sessionStorage.setItem('adminToken', token);
            }
        },
        adminLoggedOut: (state) => {
            state.admin = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;

            // Clear from both localStorage and sessionStorage
            localStorage.removeItem('adminData');
            localStorage.removeItem('adminToken');
            sessionStorage.removeItem('adminData');
            sessionStorage.removeItem('adminToken');
        },
        setAdminLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        updateAdminProfile: (state, action) => {
            const updatedAdmin = { ...state.admin, ...action.payload };
            state.admin = updatedAdmin;

            // Update both localStorage and sessionStorage
            try {
                localStorage.setItem('adminData', JSON.stringify(updatedAdmin));
            } catch (error) {
                sessionStorage.setItem('adminData', JSON.stringify(updatedAdmin));
            }
        },
    },
});

export const {
    adminLoggedIn,
    adminLoggedOut,
    setAdminLoading,
    updateAdminProfile,
} = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
