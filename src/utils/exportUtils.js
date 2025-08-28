import * as XLSX from 'xlsx';

export const exportToExcel = (data, filename = 'export.xlsx', sheetName = 'Sheet1') => {
    try {
        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Convert data to worksheet format
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

        // Generate the Excel file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Create blob and download
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);

        // Create download link
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
        console.error('Export error:', error);
        return false;
    }
};

export const formatUserDataForExport = (users) => {
    return users.map(user => ({
        'User ID': user.id,
        'Name': user.name || 'N/A',
        'Email': user.email || 'N/A',
        'Phone': user.phone || 'N/A',
        'Status': getStatusText(user.isActive, user.isBanned, user.isVerified),
        'Is Active': user.isActive ? 'Yes' : 'No',
        'Is Verified': user.isVerified ? 'Yes' : 'No',
        'Is Banned': user.isBanned ? 'Yes' : 'No',
        'Joined Date': user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A',
        'Last Updated': user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A',
        'Role': user.role || 'N/A',
        'Address': user.address || 'N/A',
        'City': user.city || 'N/A',
        'Country': user.country || 'N/A',
        'Postal Code': user.postalCode || 'N/A'
    }));
};

const getStatusText = (isActive, isBanned, isVerified) => {
    if (isBanned) return 'Banned';
    if (isActive && isVerified) return 'Active';
    if (isActive && !isVerified) return 'Pending';
    if (!isActive) return 'Inactive';
    return 'Unknown';
};
