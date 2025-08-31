// Utility to debug storage issues
export const debugStorage = () => {
    console.log('=== STORAGE DEBUG ===');

    // Check localStorage
    console.log('localStorage adminData:', localStorage.getItem('adminData'));
    console.log('localStorage adminToken:', localStorage.getItem('adminToken'));

    // Check sessionStorage
    console.log('sessionStorage accessToken:', sessionStorage.getItem('accessToken'));
    console.log('sessionStorage refreshToken:', sessionStorage.getItem('refreshToken'));

    // Check Redux state (if available)
    try {
        const state = window.store?.getState();
        if (state) {
            console.log('Redux adminAuth state:', state.adminAuth);
        }
    } catch (error) {
        console.log('Could not access Redux state:', error);
    }

    console.log('=== END STORAGE DEBUG ===');
};

// Function to clear all admin-related storage
export const clearAdminStorage = () => {
    localStorage.removeItem('adminData');
    localStorage.removeItem('adminToken');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    console.log('Cleared all admin storage');
};
