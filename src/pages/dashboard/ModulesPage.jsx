import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
    useGetModulesQuery,
    useGetModuleStatisticsQuery,
} from "@/features/modules-apis/moduleApis";
import { useGetCoursesQuery } from "@/features/course-apis/coursesApis";
import DataTable from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Edit, Trash2, Plus, Play, Pause } from "lucide-react";
import ModuleForm from "@/components/module/ModuleForm";
import ModuleDetailsModal from "@/components/module/ModuleDetailsModal";
import ModuleStatsCards from "@/components/module/ModuleStatsCards";
import ModuleActionsBar from "@/components/module/ModuleActionsBar";
import ModuleErrorDisplay from "@/components/module/ModuleErrorDisplay";
import { createModuleTableColumns } from "@/components/module/ModuleTableColumns";
import { useModuleActions } from "@/hooks/useModuleActions";

const ModulesPage = () => {
    const navigate = useNavigate();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [selectedModuleId, setSelectedModuleId] = useState(null);
    const [editingModule, setEditingModule] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [courseFilter, setCourseFilter] = useState("All Courses");

    // API hooks
    const {
        data: modules = [],
        isLoading: modulesLoading,
        error: modulesError,
        refetch: refetchModules
    } = useGetModulesQuery();

    const { data: stats, isLoading: statsLoading } = useGetModuleStatisticsQuery();

    console.log(stats);

    // Get courses from API
    const { data: coursesData, isLoading: coursesLoading } = useGetCoursesQuery();
    const courses = coursesData?.data || [];

    // Module actions hook
    const {
        handleCreateModule,
        handleUpdateModule,
        handleDeleteModule,
        handleToggleModuleStatus,
        loadingStates
    } = useModuleActions(refetchModules);

    // Handle edit module
    const handleEditModule = useCallback((moduleId) => {
        console.log('Edit module called with ID:', moduleId);
        const module = modules?.find(m => m.id === moduleId);
        console.log('Found module:', module);
        if (module) {
            setEditingModule(module);
            setShowCreateForm(false); // Ensure create form is closed
            console.log('Set editing module:', module);
        } else {
            console.error('Module not found for ID:', moduleId);
        }
    }, [modules]);

    // Handle form submission
    const handleFormSubmit = useCallback(async (formData) => {
        console.log('Form submission with data:', formData);
        try {
            if (editingModule) {
                console.log('Updating module:', editingModule.id);
                await handleUpdateModule(formData);
                setEditingModule(null); // Close edit form after successful update
                console.log('Module updated successfully');
            } else {
                console.log('Creating new module');
                await handleCreateModule(formData);
                setShowCreateForm(false); // Close create form after successful creation
                console.log('Module created successfully');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            // Error is already handled in the hook
        }
    }, [editingModule, handleUpdateModule, handleCreateModule]);

    // Handle form close
    const handleFormClose = useCallback(() => {
        setShowCreateForm(false);
        setEditingModule(null);
    }, []);

    // Filter and search modules
    const filteredModules = useMemo(() => {
        let filtered = modules;

        // Filter by course
        if (courseFilter !== "All Courses") {
            filtered = filtered?.filter(module => module.course?.name === courseFilter);
        }

        // Filter by status
        if (statusFilter !== "All Status") {
            filtered = filtered?.filter(module => {
                if (statusFilter === "Active") return module.isActive;
                if (statusFilter === "Inactive") return !module.isActive;
                return true;
            });
        }

        // Search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered?.filter(module =>
                module.title?.toLowerCase().includes(searchLower) ||
                module.course?.name?.toLowerCase().includes(searchLower) ||
                module.description?.toLowerCase().includes(searchLower)
            );
        }

        return filtered || [];
    }, [modules, statusFilter, courseFilter, searchTerm]);

    // Get selected module for details modal
    const selectedModule = useMemo(() => {
        return modules?.find(module => module.id === selectedModuleId);
    }, [modules, selectedModuleId]);

    // Create table columns with action handlers
    const columns = createModuleTableColumns({
        onViewDetails: setSelectedModuleId,
        onEdit: handleEditModule,
        onDelete: handleDeleteModule,
        onToggleStatus: handleToggleModuleStatus,
        loadingStates,
    });

    if (modulesError) {
        return <ModuleErrorDisplay error={modulesError} />;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Modules</h1>
                    <p className="text-muted-foreground">
                        Manage your course modules and their content
                    </p>
                </div>
                <Button onClick={() => setShowCreateForm(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Module
                </Button>
            </div>

            {/* Statistics Cards */}
            <ModuleStatsCards stats={stats} loading={statsLoading} />

            {/* Filters and Actions */}
            <ModuleActionsBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                courseFilter={courseFilter}
                setCourseFilter={setCourseFilter}
                courses={courses}
                coursesLoading={coursesLoading}
            />

            {/* Data Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Modules</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={filteredModules}
                        isLoading={modulesLoading}
                        searchKey="title"
                    />
                </CardContent>
            </Card>

            {/* Create/Edit Module Form Modal */}
            {(showCreateForm || editingModule) && (
                <ModuleForm
                    isOpen={showCreateForm || !!editingModule}
                    onClose={handleFormClose}
                    onSubmit={handleFormSubmit}
                    module={editingModule}
                    courses={courses}
                    loading={loadingStates.create || loadingStates.update}
                />
            )}

            {/* Module Details Modal */}
            {selectedModule && (
                <ModuleDetailsModal
                    module={selectedModule}
                    isOpen={!!selectedModule}
                    onClose={() => setSelectedModuleId(null)}
                />
            )}
        </div>
    );
};

export default ModulesPage;
