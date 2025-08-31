import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, Filter, Download } from "lucide-react";
import { useGetModulesQuery } from "@/features/modules-apis/moduleApis";

const AssignmentActionsBar = ({
    onSearch,
    onFilter,
    onCreate,
    onExport,
    searchValue = "",
    selectedModule = "",
    selectedStatus = "",
    isLoading = false
}) => {
    const [search, setSearch] = useState(searchValue);
    const [moduleFilter, setModuleFilter] = useState(selectedModule || "all");
    const [statusFilter, setStatusFilter] = useState(selectedStatus || "all");

    const { data: modulesData, isLoading: modulesLoading } = useGetModulesQuery();
    const modules = modulesData || [];

    const handleSearchChange = (value) => {
        setSearch(value);
        onSearch(value);
    };

    const handleModuleFilterChange = (value) => {
        setModuleFilter(value);
        onFilter({ moduleId: value, status: statusFilter });
    };

    const handleStatusFilterChange = (value) => {
        setStatusFilter(value);
        onFilter({ moduleId: moduleFilter, status: value });
    };

    const handleExport = () => {
        onExport({
            search,
            moduleId: moduleFilter,
            status: statusFilter
        });
    };

    return (
        <Card className="mb-6">
            <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    {/* Search and Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
                        {/* Search */}
                        <div className="relative flex-1 sm:max-w-xs">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search assignments..."
                                value={search}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Module Filter */}
                        <Select
                            value={moduleFilter}
                            onValueChange={handleModuleFilterChange}
                            disabled={modulesLoading}
                        >
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="All Modules" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Modules</SelectItem>
                                {modules.map((module) => (
                                    <SelectItem key={module.id} value={module.id.toString()}>
                                        {module.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Status Filter */}
                        <Select
                            value={statusFilter}
                            onValueChange={handleStatusFilterChange}
                        >
                            <SelectTrigger className="w-full sm:w-[140px]">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 w-full lg:w-auto">
                        <Button
                            variant="outline"
                            onClick={handleExport}
                            disabled={isLoading}
                            className="flex items-center gap-2"
                        >
                            <Download className="h-4 w-4" />
                            Export
                        </Button>
                        <Button
                            onClick={onCreate}
                            disabled={isLoading}
                            className="flex items-center gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Create Assignment
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AssignmentActionsBar;
