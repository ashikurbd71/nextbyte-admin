export const EnrollmentStatus = {
    PENDING: 'pending',
    ACTIVE: 'active',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
};

export const PaymentStatus = {
    PENDING: 'pending',
    SUCCESS: 'success',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded'
};

export const PaymentMethod = {
    SSLCOMMERZ: 'sslcommerz',
    BANK_TRANSFER: 'bank_transfer',
    CASH: 'cash',
    MANUAL: 'manual',
    CHECK: 'check',
    OTHER: 'other'
};

// Helper functions to get display names
export const getEnrollmentStatusDisplay = (status) => {
    const statusMap = {
        [EnrollmentStatus.PENDING]: 'Pending',
        [EnrollmentStatus.ACTIVE]: 'Active',
        [EnrollmentStatus.COMPLETED]: 'Completed',
        [EnrollmentStatus.CANCELLED]: 'Cancelled'
    };
    return statusMap[status] || status;
};

export const getPaymentStatusDisplay = (status) => {
    const statusMap = {
        [PaymentStatus.PENDING]: 'Pending',
        [PaymentStatus.SUCCESS]: 'Success',
        [PaymentStatus.FAILED]: 'Failed',
        [PaymentStatus.CANCELLED]: 'Cancelled',
        [PaymentStatus.REFUNDED]: 'Refunded'
    };
    return statusMap[status] || status;
};

export const getPaymentMethodDisplay = (method) => {
    const methodMap = {
        [PaymentMethod.SSLCOMMERZ]: 'SSL Commerz',
        [PaymentMethod.BANK_TRANSFER]: 'Bank Transfer',
        [PaymentMethod.CASH]: 'Cash',
        [PaymentMethod.MANUAL]: 'Manual Payment',
        [PaymentMethod.CHECK]: 'Check',
        [PaymentMethod.OTHER]: 'Other'
    };
    return methodMap[method] || method;
};

// Helper functions to get status colors
export const getEnrollmentStatusColor = (status) => {
    const colorMap = {
        [EnrollmentStatus.PENDING]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
        [EnrollmentStatus.ACTIVE]: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        [EnrollmentStatus.COMPLETED]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
        [EnrollmentStatus.CANCELLED]: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
};

export const getPaymentStatusColor = (status) => {
    const colorMap = {
        [PaymentStatus.PENDING]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
        [PaymentStatus.SUCCESS]: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        [PaymentStatus.FAILED]: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
        [PaymentStatus.CANCELLED]: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
        [PaymentStatus.REFUNDED]: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
};

// Get all options for select dropdowns
export const getEnrollmentStatusOptions = () => [
    { value: EnrollmentStatus.PENDING, label: getEnrollmentStatusDisplay(EnrollmentStatus.PENDING) },
    { value: EnrollmentStatus.ACTIVE, label: getEnrollmentStatusDisplay(EnrollmentStatus.ACTIVE) },
    { value: EnrollmentStatus.COMPLETED, label: getEnrollmentStatusDisplay(EnrollmentStatus.COMPLETED) },
    { value: EnrollmentStatus.CANCELLED, label: getEnrollmentStatusDisplay(EnrollmentStatus.CANCELLED) }
];

export const getPaymentStatusOptions = () => [
    { value: PaymentStatus.PENDING, label: getPaymentStatusDisplay(PaymentStatus.PENDING) },
    { value: PaymentStatus.SUCCESS, label: getPaymentStatusDisplay(PaymentStatus.SUCCESS) },
    { value: PaymentStatus.FAILED, label: getPaymentStatusDisplay(PaymentStatus.FAILED) },
    { value: PaymentStatus.CANCELLED, label: getPaymentStatusDisplay(PaymentStatus.CANCELLED) },
    { value: PaymentStatus.REFUNDED, label: getPaymentStatusDisplay(PaymentStatus.REFUNDED) }
];

export const getPaymentMethodOptions = () => [
    { value: PaymentMethod.SSLCOMMERZ, label: getPaymentMethodDisplay(PaymentMethod.SSLCOMMERZ) },
    { value: PaymentMethod.BANK_TRANSFER, label: getPaymentMethodDisplay(PaymentMethod.BANK_TRANSFER) },
    { value: PaymentMethod.CASH, label: getPaymentMethodDisplay(PaymentMethod.CASH) },
    { value: PaymentMethod.MANUAL, label: getPaymentMethodDisplay(PaymentMethod.MANUAL) },
    { value: PaymentMethod.CHECK, label: getPaymentMethodDisplay(PaymentMethod.CHECK) },
    { value: PaymentMethod.OTHER, label: getPaymentMethodDisplay(PaymentMethod.OTHER) }
];

// Admin Role Enums
export const AdminRole = {
    MODERATOR: 'moderator',
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin'
};

// Route Permissions Configuration
export const RoutePermissions = {
    // Super Admin - Access to all routes
    [AdminRole.SUPER_ADMIN]: [
        'dashboard',
        'analytics',
        'instructor',
        'enrollment',
        'support-tickets',
        'user',
        'categories',
        'courses',
        'modules',
        'lessons',
        'reviews',
        'notifications',
        'assignments',
        'assignment-submissions'
    ],
    
    // Admin - Access to most routes except restricted ones
    [AdminRole.ADMIN]: [
        'user',
        'categories',
        'courses',
        'modules',
        'lessons',
        'reviews',
        'notifications',
        'assignments',
        'assignment-submissions'
    ],
    
    // Moderator - Limited access
    [AdminRole.MODERATOR]: [
        'user',
        'categories',
        'courses',
        'modules',
        'lessons',
        'reviews',
        'notifications'
    ]
};

// Helper functions for admin roles
export const getAdminRoleDisplay = (role) => {
    const roleMap = {
        [AdminRole.MODERATOR]: 'Moderator',
        [AdminRole.ADMIN]: 'Admin',
        [AdminRole.SUPER_ADMIN]: 'Super Admin'
    };
    return roleMap[role] || role;
};

export const getAdminRoleColor = (role) => {
    const colorMap = {
        [AdminRole.MODERATOR]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
        [AdminRole.ADMIN]: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        [AdminRole.SUPER_ADMIN]: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
    };
    return colorMap[role] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
};

export const getAdminRoleOptions = () => [
    { value: AdminRole.MODERATOR, label: getAdminRoleDisplay(AdminRole.MODERATOR) },
    { value: AdminRole.ADMIN, label: getAdminRoleDisplay(AdminRole.ADMIN) },
    { value: AdminRole.SUPER_ADMIN, label: getAdminRoleDisplay(AdminRole.SUPER_ADMIN) }
];

// Permission checking functions
export const hasPermission = (userRole, route) => {
    if (!userRole || !RoutePermissions[userRole]) return false;
    return RoutePermissions[userRole].includes(route);
};

export const canAccessRoute = (userRole, route) => {
    return hasPermission(userRole, route);
};

export const getAccessibleRoutes = (userRole) => {
    return RoutePermissions[userRole] || [];
};
