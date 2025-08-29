// Helper functions for enrollment management

// Get status color classes
export const getStatusColor = (status) => {
    switch (status) {
        case "active":
            return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
        case "completed":
            return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
        case "pending":
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
};

// Get progress color classes
export const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-600";
    if (progress >= 60) return "bg-yellow-600";
    if (progress >= 40) return "bg-orange-600";
    return "bg-red-600";
};

// Format currency
export const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

// Format date
export const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

// Filter enrollments based on search and status
export const filterEnrollments = (enrollments, searchTerm, statusFilter) => {
    return enrollments.filter(enrollment => {
        const student = enrollment.student || enrollment;
        const matchesSearch = student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email?.toLowerCase().includes(searchTerm.toLowerCase());

        // Filter by enrollment status
        let matchesStatus = true;
        if (statusFilter === "active") {
            matchesStatus = enrollment.status === "active";
        } else if (statusFilter === "completed") {
            matchesStatus = enrollment.status === "completed";
        } else if (statusFilter === "pending") {
            matchesStatus = enrollment.status === "pending";
        }

        return matchesSearch && matchesStatus;
    });
};

// Format enrollment data for Excel export
export const formatEnrollmentDataForExport = (enrollments) => {
    return enrollments.map(enrollment => {
        const student = enrollment.student || enrollment;
        return {
            'Student ID': student.id || '',
            'Student Name': student.name || 'Unknown',
            'Email': student.email || 'No email',
            'Phone': student.phone || 'No phone',
            'Course Name': enrollment.courseName || 'N/A',
            'Progress': enrollment.progress ? `${enrollment.progress}%` : '0%',
            'Status': enrollment.status || 'N/A',
            'Amount Paid': enrollment.amountPaid ? `$${enrollment.amountPaid}` : 'N/A',
            'Enrolled Date': enrollment.enrolledAt ? new Date(enrollment.enrolledAt).toLocaleDateString() : 'N/A',
            'Completed Date': enrollment.completedAt ? new Date(enrollment.completedAt).toLocaleDateString() : 'N/A'
        };
    });
};
