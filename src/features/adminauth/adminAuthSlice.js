import { createSlice } from "@reduxjs/toolkit";

// Get admin data from localStorage or sessionStorage on initialization
const getStoredAdminData = () => {
    try {
        // Try localStorage first
        let adminData = localStorage.getItem('adminData');
        let adminToken = localStorage.getItem('adminToken');

        // Validate the data before using it
        if (adminData && adminToken) {
            const parsedAdmin = JSON.parse(adminData);
            // Basic validation - ensure we have required fields
            if (parsedAdmin && parsedAdmin.id && parsedAdmin.email && adminToken) {
                return { admin: parsedAdmin, token: adminToken };
            }
        }

        // If localStorage data is invalid, try sessionStorage
        adminData = sessionStorage.getItem('adminData');
        adminToken = sessionStorage.getItem('adminToken');

        if (adminData && adminToken) {
            const parsedAdmin = JSON.parse(adminData);
            if (parsedAdmin && parsedAdmin.id && parsedAdmin.email && adminToken) {
                return { admin: parsedAdmin, token: adminToken };
            }
        }

        return null;
    } catch (error) {
        console.error('Error reading from storage:', error);
        // Clear corrupted data
        try {
            localStorage.removeItem('adminData');
            localStorage.removeItem('adminToken');
            sessionStorage.removeItem('adminData');
            sessionStorage.removeItem('adminToken');
        } catch (clearError) {
            console.error('Error clearing corrupted storage:', clearError);
        }
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
                try {
                    sessionStorage.setItem('adminData', JSON.stringify(admin));
                    sessionStorage.setItem('adminToken', token);
                } catch (sessionError) {
                    console.error('Redux: Error storing in sessionStorage:', sessionError);
                }
            }
        },
        adminLoggedOut: (state) => {
            state.admin = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;

            // Clear from both localStorage and sessionStorage
            try {
                localStorage.removeItem('adminData');
                localStorage.removeItem('adminToken');
                sessionStorage.removeItem('adminData');
                sessionStorage.removeItem('adminToken');
            } catch (error) {
                console.error('Error clearing storage on logout:', error);
            }
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
                console.error('Error updating localStorage:', error);
                try {
                    sessionStorage.setItem('adminData', JSON.stringify(updatedAdmin));
                } catch (sessionError) {
                    console.error('Error updating sessionStorage:', sessionError);
                }
            }
        },
        clearAuthData: (state) => {
            state.admin = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        },
    },
});

export const {
    adminLoggedIn,
    adminLoggedOut,
    setAdminLoading,
    updateAdminProfile,
    clearAuthData,
} = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
