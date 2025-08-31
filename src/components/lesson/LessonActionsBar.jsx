import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, Filter, Download, Upload, X } from "lucide-react";

const LessonActionsBar = ({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    moduleFilter,
    setModuleFilter,
    contentTypeFilter,
    setContentTypeFilter,
    modules,
    onCreateLesson,
    onExport,
    onImport,
    showCreateButton = true,
}) => {
    const hasActiveFilters = statusFilter !== "All Status" ||
        moduleFilter !== "All Modules" ||
        contentTypeFilter !== "All Types" ||
        searchTerm;

    const clearAllFilters = () => {
        setSearchTerm("");
        setStatusFilter("All Status");
        setModuleFilter("All Modules");
        setContentTypeFilter("All Types");
    };

    return (
        <Card className="shadow-sm border-0">
            <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                    {/* Search and Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
                        {/* Search */}
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search lessons by title, module, or description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-10 h-10 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-primary"
                            />
                            {searchTerm && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>

                        {/* Status Filter */}
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[140px] h-10 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-primary">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All Status">All Status</SelectItem>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Module Filter */}
                        <Select value={moduleFilter} onValueChange={setModuleFilter}>
                            <SelectTrigger className="w-[160px] h-10 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-primary">
                                <SelectValue placeholder="Module" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All Modules">All Modules</SelectItem>
                                {modules?.map((module) => (
                                    <SelectItem key={module.id} value={module.title}>
                                        {module.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Content Type Filter */}
                        <Select value={contentTypeFilter} onValueChange={setContentTypeFilter}>
                            <SelectTrigger className="w-[160px] h-10 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-primary">
                                <SelectValue placeholder="Content Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All Types">All Types</SelectItem>
                                <SelectItem value="Video">Video</SelectItem>
                                <SelectItem value="File">File</SelectItem>
                                <SelectItem value="Text">Text</SelectItem>
                                <SelectItem value="None">None</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Clear Filters */}
                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                onClick={clearAllFilters}
                                className="h-10 px-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                            >
                                Clear Filters
                            </Button>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                        {showCreateButton && (
                            <Button
                                onClick={onCreateLesson}
                                className="flex items-center gap-2 h-10 px-4 bg-primary hover:bg-primary/90 text-white shadow-sm"
                            >
                                <Plus className="h-4 w-4" />
                                Add Lesson
                            </Button>
                        )}

                        {onExport && (
                            <Button
                                variant="outline"
                                onClick={onExport}
                                className="flex items-center gap-2 h-10 px-4 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                                <Download className="h-4 w-4" />
                                Export
                            </Button>
                        )}

                        {onImport && (
                            <Button
                                variant="outline"
                                onClick={onImport}
                                className="flex items-center gap-2 h-10 px-4 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                                <Upload className="h-4 w-4" />
                                Import
                            </Button>
                        )}
                    </div>
                </div>

                {/* Active Filters Display */}
                {hasActiveFilters && (
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
                        <div className="flex flex-wrap gap-2">
                            {searchTerm && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-md">
                                    Search: "{searchTerm}"
                                </span>
                            )}
                            {statusFilter !== "All Status" && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-md">
                                    Status: {statusFilter}
                                </span>
                            )}
                            {moduleFilter !== "All Modules" && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 rounded-md">
                                    Module: {moduleFilter}
                                </span>
                            )}
                            {contentTypeFilter !== "All Types" && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 rounded-md">
                                    Type: {contentTypeFilter}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default LessonActionsBar;
