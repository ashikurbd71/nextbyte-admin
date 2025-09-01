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
    return enrollments.filter(student => {
        const matchesSearch = student.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.studentEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.studentPhone?.toLowerCase().includes(searchTerm.toLowerCase());

        // Filter by enrollment status
        let matchesStatus = true;
        if (statusFilter === "active") {
            matchesStatus = student.status === "active";
        } else if (statusFilter === "completed") {
            matchesStatus = student.status === "completed";
        } else if (statusFilter === "pending") {
            matchesStatus = student.status === "pending";
        }

        return matchesSearch && matchesStatus;
    });
};

// Format enrollment data for Excel export
export const formatEnrollmentDataForExport = (enrollments) => {
    if (!enrollments || !Array.isArray(enrollments)) {
        return [];
    }

    return enrollments.map(student => {
        return {
            'Student ID': student.studentId || '',
            'Student Name': student.studentName || 'Unknown',
            'Email': student.studentEmail || 'No email',
            'Phone': student.studentPhone || 'No phone',
            'Progress': student.progress ? `${student.progress}%` : '0%',
            'Status': student.status || 'N/A',
            'Payment Status': student.paymentStatus || 'N/A',
            'Amount Paid': student.amountPaid ? `$${student.amountPaid}` : 'N/A',
            'Enrolled Date': student.enrolledAt ? new Date(student.enrolledAt).toLocaleDateString() : 'N/A',
            'Completed Date': student.completedAt ? new Date(student.completedAt).toLocaleDateString() : 'N/A'
        };
    });
};
