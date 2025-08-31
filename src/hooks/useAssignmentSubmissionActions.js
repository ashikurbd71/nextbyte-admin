import { useState } from 'react';
import toast from 'react-hot-toast';
import {
    useCreateAssignmentSubmissionMutation,
    useUpdateAssignmentSubmissionMutation,
    useDeleteAssignmentSubmissionMutation,
    useReviewAssignmentSubmissionMutation,
} from '@/features/assignmentsubmesion-apis/assignmentsubmesionApis';

export const useAssignmentSubmissionActions = (refetchSubmissions) => {
    const [createSubmission, { isLoading: isCreating }] = useCreateAssignmentSubmissionMutation();
    const [updateSubmission, { isLoading: isUpdating }] = useUpdateAssignmentSubmissionMutation();
    const [deleteSubmission, { isLoading: isDeleting }] = useDeleteAssignmentSubmissionMutation();
    const [reviewSubmission, { isLoading: isReviewing }] = useReviewAssignmentSubmissionMutation();

    const handleCreateSubmission = async (submissionData) => {
        try {
            await createSubmission(submissionData).unwrap();
            toast.success("Assignment submission created successfully!");
            if (refetchSubmissions) refetchSubmissions();
            return true;
        } catch (error) {
            console.error("Error creating submission:", error);
            toast.error(error?.data?.message || "Failed to create submission");
            return false;
        }
    };

    const handleUpdateSubmission = async ({ id, ...submissionData }) => {
        try {
            await updateSubmission({ id, ...submissionData }).unwrap();
            toast.success("Assignment submission updated successfully!");
            if (refetchSubmissions) refetchSubmissions();
            return true;
        } catch (error) {
            console.error("Error updating submission:", error);
            toast.error(error?.data?.message || "Failed to update submission");
            return false;
        }
    };

    const handleDeleteSubmission = async (submissionId) => {
        if (!confirm("Are you sure you want to delete this submission? This action cannot be undone.")) {
            return false;
        }

        try {
            await deleteSubmission(submissionId).unwrap();
            toast.success("Assignment submission deleted successfully!");
            if (refetchSubmissions) refetchSubmissions();
            return true;
        } catch (error) {
            console.error("Error deleting submission:", error);
            toast.error(error?.data?.message || "Failed to delete submission");
            return false;
        }
    };

    const handleReviewSubmission = async ({ id, reviewData }) => {
        try {
            await reviewSubmission({ id, reviewData }).unwrap();
            toast.success("Assignment submission reviewed successfully!");
            if (refetchSubmissions) refetchSubmissions();
            return true;
        } catch (error) {
            console.error("Error reviewing submission:", error);
            toast.error(error?.data?.message || "Failed to review submission");
            return false;
        }
    };

    return {
        // Actions
        createSubmission: handleCreateSubmission,
        updateSubmission: handleUpdateSubmission,
        deleteSubmission: handleDeleteSubmission,
        reviewSubmission: handleReviewSubmission,

        // Loading states
        isCreating,
        isUpdating,
        isDeleting,
        isReviewing,

        // Combined loading state
        isLoading: isCreating || isUpdating || isDeleting || isReviewing,
    };
};
