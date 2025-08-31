import { useState } from "react";
import toast from "react-hot-toast";
import {
    useCreateLessonMutation,
    useUpdateLessonMutation,
    useDeleteLessonMutation,
    useToggleLessonActiveStatusMutation,
    useToggleLessonPreviewStatusMutation,
} from "@/features/lession-apis/lessionApis";

export const useLessonActions = (refetchLessons) => {
    const [loadingStates, setLoadingStates] = useState({
        create: false,
        update: false,
        delete: {},
        toggle: {},
        togglePreview: {},
    });

    const [createLesson] = useCreateLessonMutation();
    const [updateLesson] = useUpdateLessonMutation();
    const [deleteLesson] = useDeleteLessonMutation();
    const [toggleLessonStatus] = useToggleLessonActiveStatusMutation();
    const [toggleLessonPreview] = useToggleLessonPreviewStatusMutation();

    const handleCreateLesson = async (lessonData) => {
        try {
            setLoadingStates(prev => ({ ...prev, create: true }));

            const result = await createLesson(lessonData).unwrap();

            toast.success("Lesson created successfully!");
            refetchLessons();

            return result;
        } catch (error) {
            const errorMessage = error?.data?.message || "Failed to create lesson";
            toast.error(errorMessage);
            throw error;
        } finally {
            setLoadingStates(prev => ({ ...prev, create: false }));
        }
    };

    const handleUpdateLesson = async (lessonData) => {
        try {
            setLoadingStates(prev => ({ ...prev, update: true }));

            const result = await updateLesson(lessonData).unwrap();

            toast.success("Lesson updated successfully!");
            refetchLessons();

            return result;
        } catch (error) {
            const errorMessage = error?.data?.message || "Failed to update lesson";
            toast.error(errorMessage);
            throw error;
        } finally {
            setLoadingStates(prev => ({ ...prev, update: false }));
        }
    };

    const handleDeleteLesson = async (lessonId) => {
        try {
            setLoadingStates(prev => ({
                ...prev,
                delete: { ...prev.delete, [lessonId]: true }
            }));

            await deleteLesson(lessonId).unwrap();

            toast.success("Lesson deleted successfully!");
            refetchLessons();
        } catch (error) {
            const errorMessage = error?.data?.message || "Failed to delete lesson";
            toast.error(errorMessage);
            throw error;
        } finally {
            setLoadingStates(prev => ({
                ...prev,
                delete: { ...prev.delete, [lessonId]: false }
            }));
        }
    };

    const handleToggleLessonStatus = async (lessonId, isActive) => {
        try {
            setLoadingStates(prev => ({
                ...prev,
                toggle: { ...prev.toggle, [lessonId]: true }
            }));

            await toggleLessonStatus({ id: lessonId, isActive }).unwrap();

            const statusText = isActive ? "activated" : "deactivated";
            toast.success(`Lesson ${statusText} successfully!`);
            refetchLessons();
        } catch (error) {
            const errorMessage = error?.data?.message || "Failed to toggle lesson status";
            toast.error(errorMessage);
            throw error;
        } finally {
            setLoadingStates(prev => ({
                ...prev,
                toggle: { ...prev.toggle, [lessonId]: false }
            }));
        }
    };

    const handleToggleLessonPreview = async (lessonId, isPreview) => {
        try {
            setLoadingStates(prev => ({
                ...prev,
                togglePreview: { ...prev.togglePreview, [lessonId]: true }
            }));

            await toggleLessonPreview({ id: lessonId, isPreview }).unwrap();

            const statusText = isPreview ? "enabled" : "disabled";
            toast.success(`Lesson preview ${statusText} successfully!`);
            refetchLessons();
        } catch (error) {
            const errorMessage = error?.data?.message || "Failed to toggle lesson preview";
            toast.error(errorMessage);
            throw error;
        } finally {
            setLoadingStates(prev => ({
                ...prev,
                togglePreview: { ...prev.togglePreview, [lessonId]: false }
            }));
        }
    };

    return {
        handleCreateLesson,
        handleUpdateLesson,
        handleDeleteLesson,
        handleToggleLessonStatus,
        handleToggleLessonPreview,
        loadingStates
    };
};
