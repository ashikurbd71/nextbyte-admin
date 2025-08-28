import { useState } from "react";
import { toast } from "react-hot-toast";
import {
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
    useToggleCourseStatusMutation,
    useToggleCourseActiveStatusMutation,
    useToggleCoursePublicStatusMutation,
} from "@/features/course-apis/coursesApis";

export const useCourseActions = (refetchCourses) => {
    const [loadingStates, setLoadingStates] = useState({});

    const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();
    const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();
    const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();
    const [toggleStatus, { isLoading: isToggling }] = useToggleCourseStatusMutation();
    const [toggleActiveStatus, { isLoading: isTogglingActive }] = useToggleCourseActiveStatusMutation();
    const [togglePublicStatus, { isLoading: isTogglingPublic }] = useToggleCoursePublicStatusMutation();

    const setLoading = (courseId, loading, type = '') => {
        const key = type ? `${type}-${courseId}` : courseId;
        setLoadingStates(prev => ({
            ...prev,
            [key]: loading
        }));
    };

    const handleCreateCourse = async (courseData) => {
        try {
            await createCourse(courseData).unwrap();
            toast.success("Course created successfully!");
            refetchCourses();
            return true;
        } catch (error) {
            console.error("Error creating course:", error);
            toast.error(error?.data?.message || "Failed to create course");
            return false;
        }
    };

    const handleUpdateCourse = async (courseId, courseData) => {
        try {
            setLoading(courseId, true);
            await updateCourse({ id: courseId, ...courseData }).unwrap();
            toast.success("Course updated successfully!");
            refetchCourses();
            return true;
        } catch (error) {
            console.error("Error updating course:", error);
            toast.error(error?.data?.message || "Failed to update course");
            return false;
        } finally {
            setLoading(courseId, false);
        }
    };

    const handleDeleteCourse = async (courseId) => {
        if (!confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
            return false;
        }

        try {
            setLoading(courseId, true);
            await deleteCourse(courseId).unwrap();
            toast.success("Course deleted successfully!");
            refetchCourses();
            return true;
        } catch (error) {
            console.error("Error deleting course:", error);
            toast.error(error?.data?.message || "Failed to delete course");
            return false;
        } finally {
            setLoading(courseId, false);
        }
    };

    const handleToggleCourseStatus = async (courseId, isPublished) => {
        try {
            setLoading(courseId, true);
            await toggleStatus({ id: courseId, status: isPublished ? "published" : "draft" }).unwrap();
            const statusText = isPublished ? "published" : "unpublished";
            toast.success(`Course ${statusText} successfully!`);
            refetchCourses();
            return true;
        } catch (error) {
            console.error("Error toggling course status:", error);
            toast.error(error?.data?.message || "Failed to update course status");
            return false;
        } finally {
            setLoading(courseId, false);
        }
    };

    const handleToggleActiveStatus = async (courseId, isActive) => {
        try {
            setLoading(courseId, true, 'active');
            await toggleActiveStatus({ id: courseId, isActive }).unwrap();
            const statusText = isActive ? "activated" : "deactivated";
            toast.success(`Course ${statusText} successfully!`);
            refetchCourses();
            return true;
        } catch (error) {
            console.error("Error toggling course active status:", error);
            toast.error(error?.data?.message || "Failed to update course active status");
            return false;
        } finally {
            setLoading(courseId, false, 'active');
        }
    };

    const handleTogglePublicStatus = async (courseId, isPublic) => {
        try {
            setLoading(courseId, true, 'public');
            await togglePublicStatus({ id: courseId, isPublic }).unwrap();
            const statusText = isPublic ? "made public" : "made private";
            toast.success(`Course ${statusText} successfully!`);
            refetchCourses();
            return true;
        } catch (error) {
            console.error("Error toggling course public status:", error);
            toast.error(error?.data?.message || "Failed to update course public status");
            return false;
        } finally {
            setLoading(courseId, false, 'public');
        }
    };

    const handlePublishCourse = async (courseId) => {
        return handleToggleCourseStatus(courseId, "published");
    };

    const handleUnpublishCourse = async (courseId) => {
        return handleToggleCourseStatus(courseId, "draft");
    };

    const handleArchiveCourse = async (courseId) => {
        return handleToggleCourseStatus(courseId, "archived");
    };

    return {
        handleCreateCourse,
        handleUpdateCourse,
        handleDeleteCourse,
        handleToggleCourseStatus,
        handleToggleActiveStatus,
        handleTogglePublicStatus,
        handlePublishCourse,
        handleUnpublishCourse,
        handleArchiveCourse,
        loadingStates,
        isCreating,
        isUpdating,
        isDeleting,
        isToggling,
        isTogglingActive,
        isTogglingPublic,
    };
};
