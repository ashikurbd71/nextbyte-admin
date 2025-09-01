// Storage Debug Utility
export const debugStorage = () => {
    console.log('=== Storage Debug ===');

    // Check localStorage
    console.log('localStorage adminData:', localStorage.getItem('adminData'));
    console.log('localStorage adminToken:', localStorage.getItem('adminToken'));

    // Check sessionStorage
    console.log('sessionStorage adminData:', sessionStorage.getItem('adminData'));
    console.log('sessionStorage adminToken:', sessionStorage.getItem('adminToken'));

    // Check if data is valid JSON
    try {
        const adminData = localStorage.getItem('adminData');
        if (adminData) {
            const parsed = JSON.parse(adminData);
            console.log('Parsed adminData:', parsed);
            console.log('Data validation:', {
                hasId: !!parsed.id,
                hasEmail: !!parsed.email,
                hasRole: !!parsed.role
            });
        }
    } catch (error) {
        console.error('Error parsing adminData:', error);
    }

    console.log('=== End Storage Debug ===');
};

export const clearAllStorage = () => {
    console.log('Clearing all storage...');

    // Clear localStorage
    localStorage.removeItem('adminData');
    localStorage.removeItem('adminToken');

    // Clear sessionStorage
    sessionStorage.removeItem('adminData');
    sessionStorage.removeItem('adminToken');

    // Clear any other auth-related items
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes('admin') || key.includes('token') || key.includes('auth'))) {
            keysToRemove.push(key);
        }
    }

    keysToRemove.forEach(key => {
        localStorage.removeItem(key);
        console.log(`Removed: ${key}`);
    });

    console.log('Storage cleared successfully');
};

export const validateStorageData = () => {
    try {
        const adminData = localStorage.getItem('adminData') || sessionStorage.getItem('adminData');
        const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');

        if (!adminData || !adminToken) {
            return { isValid: false, reason: 'Missing data or token' };
        }

        const parsedAdmin = JSON.parse(adminData);

        if (!parsedAdmin.id || !parsedAdmin.email) {
            return { isValid: false, reason: 'Invalid admin data structure' };
        }

        return { isValid: true, data: parsedAdmin, token: adminToken };
    } catch (error) {
        return { isValid: false, reason: 'JSON parsing error', error: error.message };
    }
};

// Auto-cleanup function to run on app initialization
export const initializeStorageCleanup = () => {
    const validation = validateStorageData();
    if (!validation.isValid) {
        console.warn('Invalid storage data detected:', validation.reason);
        clearAllStorage();
        return false;
    }
    return true;
};
