import React, { useState, useMemo } from 'react';
import {
    AssignmentForm,
    AssignmentTable,
    AssignmentActionsBar,
    AssignmentDetailsModal,
    AssignmentStatsCards,
    AssignmentErrorDisplay
} from '@/components/assignment';
import {
    useGetAssignmentsQuery,
    useGetAssignmentStatisticsQuery
} from '@/features/assignment-apis/assignmentApis';
import { useAssignmentActions } from '@/hooks/useAssignmentActions';
import useTitle from '@/hooks/useTitle';
import { exportToExcel } from '@/utils/excel-export';
import toast from 'react-hot-toast';

const Assignments = () => {
    useTitle('Assignments - Admin Dashboard');

    // State management
    const [showForm, setShowForm] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        moduleId: 'all',
        status: 'all'
    });

    // API hooks
    const { data: assignments, isLoading, error, refetch } = useGetAssignmentsQuery();
    const { data: statistics, isLoading: statsLoading } = useGetAssignmentStatisticsQuery();
    const assignmentActions = useAssignmentActions(refetch);

    // Filtered assignments
    const filteredAssignments = useMemo(() => {
        if (!assignments) return [];

        console.log('Filtering assignments with:', { searchTerm, filters, assignmentsCount: assignments.length });

        return assignments.filter(assignment => {
            // Search filter
            const matchesSearch = searchTerm === '' ||
                assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                assignment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                assignment.module?.title.toLowerCase().includes(searchTerm.toLowerCase());

            // Module filter
            const matchesModule = filters.moduleId === 'all' ||
                (assignment.moduleId && assignment.moduleId.toString() === filters.moduleId);

            // Status filter
            const matchesStatus = filters.status === 'all' ||
                (filters.status === 'active' && assignment.isActive) ||
                (filters.status === 'inactive' && !assignment.isActive);

            const matches = matchesSearch && matchesModule && matchesStatus;

            if (!matches) {
                console.log('Assignment filtered out:', {
                    title: assignment.title,
                    moduleId: assignment.moduleId,
                    filterModuleId: filters.moduleId,
                    isActive: assignment.isActive,
                    filterStatus: filters.status,
                    matchesSearch,
                    matchesModule,
                    matchesStatus
                });
            }

            return matches;
        });
    }, [assignments, searchTerm, filters]);

    // Event handlers
    const handleCreate = () => {
        setSelectedAssignment(null);
        setShowForm(true);
    };

    const handleEdit = (assignment) => {
        setSelectedAssignment(assignment);
        setShowForm(true);
    };

    const handleView = (assignment) => {
        setSelectedAssignment(assignment);
        setShowDetails(true);
    };

    const handleSubmit = async (data) => {
        let success = false;
        if (selectedAssignment) {
            success = await assignmentActions.updateAssignment({ id: selectedAssignment.id, ...data });
        } else {
            success = await assignmentActions.createAssignment(data);
        }

        if (success) {
            setShowForm(false);
            setSelectedAssignment(null);
        }
    };

    const handleDelete = async (assignment) => {
        await assignmentActions.deleteAssignment(assignment.id);
    };

    const handleToggleActive = async (assignment) => {
        await assignmentActions.toggleAssignmentActive(assignment.id);
    };

    const handleSearch = (search) => {
        setSearchTerm(search);
    };

    const handleFilter = (newFilters) => {
        console.log('Filter changed:', newFilters);
        setFilters(newFilters);
    };

    const handleExport = (exportFilters) => {
        if (!filteredAssignments || filteredAssignments.length === 0) {
            toast.error("No assignment data to export");
            return;
        }

        const exportData = filteredAssignments.map(assignment => ({
            'Assignment Title': assignment.title || 'N/A',
            'Description': assignment.description || 'N/A',
            'Module': assignment.module?.title || 'N/A',
            'Total Marks': assignment.totalMarks || 0,
            'Due Date': assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'No due date',
            'Status': assignment.isActive ? 'Active' : 'Inactive',
            'GitHub Link': assignment.githubLink || 'N/A',
            'Live Link': assignment.liveLink || 'N/A',
            'Created Date': assignment.createdAt ? new Date(assignment.createdAt).toLocaleDateString() : 'N/A',
            'Last Updated': assignment.updatedAt ? new Date(assignment.updatedAt).toLocaleDateString() : 'N/A'
        }));

        const filename = `assignments_${new Date().toISOString().split('T')[0]}.xlsx`;
        const success = exportToExcel(exportData, filename, 'Assignments');

        if (success) {
            toast.success(`Successfully exported ${filteredAssignments.length} assignments to Excel`);
        } else {
            toast.error("Failed to export assignments");
        }
    };

    const handleRetry = () => {
        refetch();
    };

    // Error handling
    if (error) {
        return (
            <AssignmentErrorDisplay
                error={error}
                onRetry={handleRetry}
                title="Error Loading Assignments"
            />
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
                    <p className="text-muted-foreground">
                        Manage course assignments and track student progress
                    </p>
                </div>
            </div>

            {/* Statistics Cards */}
            <AssignmentStatsCards
                statistics={statistics}
                isLoading={statsLoading}
            />

            {/* Actions Bar */}
            <AssignmentActionsBar
                onCreate={handleCreate}
                onSearch={handleSearch}
                onFilter={handleFilter}
                onExport={handleExport}
                searchValue={searchTerm}
                selectedModule={filters.moduleId}
                selectedStatus={filters.status}
                isLoading={isLoading}
            />

            {/* Assignments Table */}
            <AssignmentTable
                assignments={filteredAssignments}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
                onToggleActive={handleToggleActive}
                isLoading={isLoading}
            />

            {/* Create/Edit Form Modal */}
            {showForm && (
                <AssignmentForm
                    assignment={selectedAssignment}
                    onSubmit={handleSubmit}
                    onClose={() => setShowForm(false)}
                    isLoading={assignmentActions.isLoading}
                />
            )}

            {/* Details Modal */}
            {showDetails && selectedAssignment && (
                <AssignmentDetailsModal
                    assignment={selectedAssignment}
                    onClose={() => setShowDetails(false)}
                    onEdit={handleEdit}
                />
            )}
        </div>
    );
};

export default Assignments;
