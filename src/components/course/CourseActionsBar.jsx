import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Filter, Download, Eye, EyeOff } from "lucide-react";

const CourseActionsBar = ({
    showDraftCourses,
    setShowDraftCourses,
    setShowCreateForm,
    courses,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    categories = [],
    categoriesLoading = false,
}) => {
    const statuses = [
        "All Status",
        "Published",
        "Draft",
        "Archived"
    ];

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            {/* Left side - Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-sm">
                    <Input
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                    />
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>

                {/* Status Filter
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[140px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {statuses.map((status) => (
                            <SelectItem key={status} value={status}>
                                {status}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select> */}

                {/* Category Filter */}
                <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                    disabled={categoriesLoading}
                >
                    <SelectTrigger className="w-full sm:w-[160px]">
                        <SelectValue placeholder={categoriesLoading ? "Loading categories..." : "Category"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All Categories">All Categories</SelectItem>
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Right side - Actions */}
            <div className="flex gap-2">
                {/* Toggle Draft Courses */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDraftCourses(!showDraftCourses)}
                    className="flex items-center gap-2"
                >
                    {showDraftCourses ? (
                        <>
                            <EyeOff className="h-4 w-4" />
                            Hide Drafts
                        </>
                    ) : (
                        <>
                            <Eye className="h-4 w-4" />
                            Show Drafts
                        </>
                    )}
                </Button>

                {/* Export Button */}
                <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => {
                        // TODO: Implement export functionality
                        console.log("Export courses");
                    }}
                >
                    <Download className="h-4 w-4" />
                    Export
                </Button>

                {/* Create Course Button */}
                <Button
                    size="sm"
                    onClick={() => setShowCreateForm(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4" />
                    Create Course
                </Button>
            </div>
        </div>
    );
};

export default CourseActionsBar;
