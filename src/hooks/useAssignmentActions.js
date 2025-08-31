import { useState } from 'react';
import toast from 'react-hot-toast';
import {
    useCreateAssignmentMutation,
    useUpdateAssignmentMutation,
    useDeleteAssignmentMutation,
    useToggleAssignmentActiveStatusMutation,
} from '@/features/assignment-apis/assignmentApis';

export const useAssignmentActions = (refetchAssignments) => {
    const [createAssignment, { isLoading: isCreating }] = useCreateAssignmentMutation();
    const [updateAssignment, { isLoading: isUpdating }] = useUpdateAssignmentMutation();
    const [deleteAssignment, { isLoading: isDeleting }] = useDeleteAssignmentMutation();
    const [toggleActive, { isLoading: isToggling }] = useToggleAssignmentActiveStatusMutation();

    const handleCreateAssignment = async (assignmentData) => {
        try {
            await createAssignment(assignmentData).unwrap();
            toast.success("Assignment created successfully!");
            if (refetchAssignments) refetchAssignments();
            return true;
        } catch (error) {
            console.error("Error creating assignment:", error);
            toast.error(error?.data?.message || "Failed to create assignment");
            return false;
        }
    };

    const handleUpdateAssignment = async ({ id, ...assignmentData }) => {
        try {
            await updateAssignment({ id, ...assignmentData }).unwrap();
            toast.success("Assignment updated successfully!");
            if (refetchAssignments) refetchAssignments();
            return true;
        } catch (error) {
            console.error("Error updating assignment:", error);
            toast.error(error?.data?.message || "Failed to update assignment");
            return false;
        }
    };

    const handleDeleteAssignment = async (assignmentId) => {
        if (!confirm("Are you sure you want to delete this assignment? This action cannot be undone.")) {
            return false;
        }

        try {
            await deleteAssignment(assignmentId).unwrap();
            toast.success("Assignment deleted successfully!");
            if (refetchAssignments) refetchAssignments();
            return true;
        } catch (error) {
            console.error("Error deleting assignment:", error);
            toast.error(error?.data?.message || "Failed to delete assignment");
            return false;
        }
    };

    const handleToggleAssignmentActive = async (assignmentId) => {
        try {
            const result = await toggleActive(assignmentId).unwrap();
            const statusText = result.isActive ? "activated" : "deactivated";
            toast.success(`Assignment ${statusText} successfully!`);
            if (refetchAssignments) refetchAssignments();
            return true;
        } catch (error) {
            console.error("Error toggling assignment status:", error);
            toast.error(error?.data?.message || "Failed to toggle assignment status");
            return false;
        }
    };

    return {
        // Actions
        createAssignment: handleCreateAssignment,
        updateAssignment: handleUpdateAssignment,
        deleteAssignment: handleDeleteAssignment,
        toggleAssignmentActive: handleToggleAssignmentActive,

        // Loading states
        isCreating,
        isUpdating,
        isDeleting,
        isToggling,

        // Combined loading state
        isLoading: isCreating || isUpdating || isDeleting || isToggling,
    };
};
