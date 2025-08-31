import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Search,
    Filter,
    Download,
    MoreHorizontal,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    Loader2
} from "lucide-react";

const DataTable = ({
    data = [],
    columns = [],
    title = "Data Table",
    searchPlaceholder = "Search...",
    searchKeys = [],
    itemsPerPage = 10,
    showSearch = true,
    showExport = true,
    showFilters = true,
    onRowClick,
    loading = false,
    emptyMessage = "No data found",
    className = "",
    selectable = false,
    onSelectionChange,
    selectedRows = []
}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [selectedItems, setSelectedItems] = useState(selectedRows);

    // Filter data based on search term
    const filteredData = useMemo(() => {
        if (!searchTerm) return data;

        return data.filter(item => {
            return searchKeys.some(key => {
                // Handle nested properties (e.g., 'category.name')
                const keys = key.split('.');
                let value = item;
                for (const k of keys) {
                    value = value?.[k];
                    if (value === null || value === undefined) break;
                }

                if (value === null || value === undefined) return false;
                return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
            });
        });
    }, [data, searchTerm, searchKeys]);

    // Sort data
    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;

        return [...filteredData].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            // Handle nested properties
            if (sortConfig.key.includes('.')) {
                const keys = sortConfig.key.split('.');
                aValue = keys.reduce((obj, key) => obj?.[key], a);
                bValue = keys.reduce((obj, key) => obj?.[key], b);
            }

            if (aValue === null || aValue === undefined) return 1;
            if (bValue === null || bValue === undefined) return -1;

            if (typeof aValue === 'string') {
                return sortConfig.direction === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            return sortConfig.direction === 'asc'
                ? aValue - bValue
                : bValue - aValue;
        });
    }, [filteredData, sortConfig]);

    // Paginate data
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedData.slice(startIndex, endIndex);
    }, [sortedData, currentPage, itemsPerPage]);

    // Calculate pagination info
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const startItem = sortedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const endItem = Math.min(currentPage * itemsPerPage, sortedData.length);

    // Handle sorting
    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    // Handle row click
    const handleRowClick = (item, event) => {
        // Don't trigger row click if clicking on action buttons
        if (event.target.closest('button') || event.target.closest('[role="button"]')) {
            return;
        }

        if (onRowClick) {
            onRowClick(item);
        }
    };

    // Handle row selection
    const handleRowSelection = (itemId) => {
        const newSelection = selectedItems.includes(itemId)
            ? selectedItems.filter(id => id !== itemId)
            : [...selectedItems, itemId];

        setSelectedItems(newSelection);
        if (onSelectionChange) {
            onSelectionChange(newSelection);
        }
    };

    // Handle select all
    const handleSelectAll = () => {
        const allIds = paginatedData.map(item => item.id);
        const newSelection = selectedItems.length === paginatedData.length ? [] : allIds;
        setSelectedItems(newSelection);
        if (onSelectionChange) {
            onSelectionChange(newSelection);
        }
    };

    // Export data
    const handleExport = () => {
        const csvContent = [
            columns.map(col => col.header).join(','),
            ...sortedData.map(row =>
                columns.map(col => {
                    const value = col.accessor ? col.accessor(row) : row[col.key];
                    return `"${value || ''}"`;
                }).join(',')
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    // Get sort icon
    const getSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey) {
            return <ArrowUpDown className="h-4 w-4 text-muted-foreground" />;
        }
        return sortConfig.direction === 'asc'
            ? <ArrowUp className="h-4 w-4 text-primary" />
            : <ArrowDown className="h-4 w-4 text-primary" />;
    };

    return (
        <Card className={className}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        {title}
                        {loading && (
                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        )}
                        {selectable && selectedItems.length > 0 && (
                            <Badge variant="secondary" className="ml-2">
                                {selectedItems.length} selected
                            </Badge>
                        )}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        {showFilters && (
                            <Button variant="outline" size="sm">
                                <Filter className="h-4 w-4 mr-2" />
                                Filters
                            </Button>
                        )}
                        {showExport && (
                            <Button variant="outline" size="sm" onClick={handleExport}>
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </Button>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                {/* Search Bar */}
                {showSearch && (
                    <div className="mb-6">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="rounded-md border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted/50">
                                <tr>
                                    {selectable && (
                                        <th className="w-12 px-4 py-3 text-left">
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.length === paginatedData.length && paginatedData.length > 0}
                                                onChange={handleSelectAll}
                                                className="rounded border-gray-300"
                                            />
                                        </th>
                                    )}
                                    {columns.map((column, index) => (
                                        <th
                                            key={index}
                                            className={`px-4 py-3 text-left text-sm font-medium text-muted-foreground ${column.sortable !== false ? 'cursor-pointer hover:bg-muted transition-colors' : ''
                                                }`}
                                            onClick={() => column.sortable !== false && handleSort(column.key)}
                                        >
                                            <div className="flex items-center gap-2">
                                                {column.header}
                                                {column.sortable !== false && getSortIcon(column.key)}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                                <p className="text-sm text-muted-foreground">Loading data...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : paginatedData.length === 0 ? (
                                    <tr>
                                        <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                                    <Search className="w-6 h-6 text-muted-foreground" />
                                                </div>
                                                <p className="text-sm font-medium text-muted-foreground">{emptyMessage}</p>
                                                {searchTerm && (
                                                    <p className="text-xs text-muted-foreground">
                                                        No results found for "{searchTerm}"
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedData.map((item, rowIndex) => (
                                        <tr
                                            key={rowIndex}
                                            className={`border-t transition-colors ${onRowClick ? 'cursor-pointer hover:bg-muted/50' : ''
                                                } ${selectedItems.includes(item.id) ? 'bg-primary/5' : ''
                                                }`}
                                            onClick={(e) => handleRowClick(item, e)}
                                        >
                                            {selectable && (
                                                <td className="w-12 px-4 py-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedItems.includes(item.id)}
                                                        onChange={() => handleRowSelection(item.id)}
                                                        className="rounded border-gray-300"
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                </td>
                                            )}
                                            {columns.map((column, colIndex) => (
                                                <td key={colIndex} className="px-4 py-3 text-sm">
                                                    {column.cell ? column.cell(item) : (column.accessor ? column.accessor(item) : item[column.key])}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <div className="flex items-center justify-between mt-6">
                        <div className="text-sm text-muted-foreground">
                            {sortedData.length > 0 ? (
                                <>
                                    Showing {startItem} to {endItem} of {sortedData.length} results
                                </>
                            ) : (
                                "No results"
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1}
                            >
                                <ChevronsLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    return (
                                        <Button
                                            key={pageNum}
                                            variant={currentPage === pageNum ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => handlePageChange(pageNum)}
                                            className="w-8 h-8 p-0"
                                        >
                                            {pageNum}
                                        </Button>
                                    );
                                })}
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(totalPages)}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronsRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default DataTable;
