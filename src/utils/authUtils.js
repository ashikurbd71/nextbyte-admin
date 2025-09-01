// Authentication Utilities
export const getAuthData = () => {
    try {
        const adminData = localStorage.getItem('adminData') || sessionStorage.getItem('adminData');
        const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');

        if (!adminData || !adminToken) {
            return null;
        }

        const parsedAdmin = JSON.parse(adminData);
        return { admin: parsedAdmin, token: adminToken };
    } catch (error) {
        console.error('Error getting auth data:', error);
        return null;
    }
};

export const setAuthData = (admin, token) => {
    try {
        localStorage.setItem('adminData', JSON.stringify(admin));
        localStorage.setItem('adminToken', token);
        return true;
    } catch (error) {
        console.error('Error setting auth data in localStorage:', error);
        try {
            sessionStorage.setItem('adminData', JSON.stringify(admin));
            sessionStorage.setItem('adminToken', token);
            return true;
        } catch (sessionError) {
            console.error('Error setting auth data in sessionStorage:', sessionError);
            return false;
        }
    }
};

export const clearAuthData = () => {
    try {
        localStorage.removeItem('adminData');
        localStorage.removeItem('adminToken');
        sessionStorage.removeItem('adminData');
        sessionStorage.removeItem('adminToken');
        return true;
    } catch (error) {
        console.error('Error clearing auth data:', error);
        return false;
    }
};

export const isTokenValid = (token) => {
    if (!token) return false;

    try {
        // Basic token validation - you might want to add more sophisticated validation
        // For JWT tokens, you could decode and check expiration
        return token.length > 10; // Basic length check
    } catch (error) {
        return false;
    }
};

// Debug function to expose in window for console debugging
export const exposeAuthDebug = () => {
    if (typeof window !== 'undefined') {
        window.authDebug = {
            getAuthData,
            clearAuthData,
            debugStorage: () => {
                console.log('Auth Data:', getAuthData());
                console.log('localStorage adminData:', localStorage.getItem('adminData'));
                console.log('localStorage adminToken:', localStorage.getItem('adminToken'));
                console.log('sessionStorage adminData:', sessionStorage.getItem('adminData'));
                console.log('sessionStorage adminToken:', sessionStorage.getItem('adminToken'));
            },
            clearAll: () => {
                clearAuthData();
                console.log('All auth data cleared');
            }
        };
        console.log('Auth debug functions available at window.authDebug');
    }
};
