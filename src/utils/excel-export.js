import * as XLSX from 'xlsx';

// Utility function to export data to Excel
export const exportToExcel = (data, filename = 'report.xlsx', sheetName = 'Report') => {
    try {
        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Convert data to worksheet format
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

        // Generate the Excel file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Create a blob and download link
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);

        // Create download link and trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        return true;
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        return false;
    }
};

// Function to format dashboard data for Excel export
export const formatDashboardDataForExport = (dashboardData) => {
    if (!dashboardData) return [];

    const exportData = [];

    // Add summary statistics
    exportData.push({ 'Metric': 'Total Users', 'Value': dashboardData.users?.total || 0 });
    exportData.push({ 'Metric': 'Total Enrollments', 'Value': dashboardData.enrollments?.total || 0 });
    exportData.push({ 'Metric': 'Total Revenue', 'Value': `$${dashboardData.earnings?.total || 0}` });
    exportData.push({ 'Metric': 'Active Enrollments', 'Value': dashboardData.enrollments?.active || 0 });
    exportData.push({ 'Metric': 'Completed Enrollments', 'Value': dashboardData.enrollments?.completed || 0 });
    exportData.push({ 'Metric': 'Pending Enrollments', 'Value': dashboardData.enrollments?.pending || 0 });
    exportData.push({ 'Metric': 'Cancelled Enrollments', 'Value': dashboardData.enrollments?.cancelled || 0 });

    return exportData;
};

// Function to format earnings data for Excel export
export const formatEarningsDataForExport = (earningsData) => {
    if (!earningsData || !earningsData.payments) return [];

    return earningsData.payments.map(payment => ({
        'Payment ID': payment.id || '',
        'Amount': `$${payment.amount || 0}`,
        'Status': payment.status || '',
        'Date': payment.date || '',
        'User': payment.user || '',
        'Course': payment.course || ''
    }));
};

// Function to format enrollment data for Excel export
export const formatEnrollmentDataForExport = (enrollmentData) => {
    if (!enrollmentData || !enrollmentData.enrollments) return [];

    return enrollmentData.enrollments.map(enrollment => ({
        'Enrollment ID': enrollment.id || '',
        'Student Name': enrollment.studentName || '',
        'Course': enrollment.course || '',
        'Status': enrollment.status || '',
        'Enrollment Date': enrollment.enrollmentDate || '',
        'Completion Date': enrollment.completionDate || ''
    }));
};
