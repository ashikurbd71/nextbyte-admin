import React, { useState, useMemo } from "react";
import {
    useGetCoursesQuery,
    useGetCourseStatisticsQuery,
} from "@/features/course-apis/coursesApis";
import { useGetCategoriesQuery } from "@/features/category/categoryApis";
import CourseForm from "@/components/course/CourseForm";
import CourseDetailsModal from "@/components/course/CourseDetailsModal";
import CourseEnrollmentModal from "@/components/course/CourseEnrollmentModal";
import DataTable from "@/components/ui/data-table";
import CourseStatsCards from "@/components/course/CourseStatsCards";
import CourseActionsBar from "@/components/course/CourseActionsBar";
import CourseErrorDisplay from "@/components/course/CourseErrorDisplay";
import { createCourseTableColumns } from "@/components/course/CourseTableColumns";
import { useCourseActions } from "@/hooks/useCourseActions";

const CoursesPage = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [editingCourse, setEditingCourse] = useState(null);
    const [enrollmentCourseId, setEnrollmentCourseId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [categoryFilter, setCategoryFilter] = useState("All Categories");

    // API hooks
    const {
        data: courses = { data: [] },
        isLoading: coursesLoading,
        error: coursesError,
        refetch: refetchCourses
    } = useGetCoursesQuery();



    const { data: stats, isLoading: statsLoading } = useGetCourseStatisticsQuery();

    // Get categories from API
    const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesQuery();
    const categories = categoriesData?.data || [];

    // Course actions hook
    const {
        handleCreateCourse,
        handleUpdateCourse,
        handleDeleteCourse,
        handleToggleCourseStatus,
        handleToggleActiveStatus,
        handleTogglePublicStatus,
        loadingStates
    } = useCourseActions(refetchCourses);

    // Filter and search courses
    const filteredCourses = useMemo(() => {
        let filtered = courses?.data;

        // Always show all courses (no draft/published filtering)
        // Filter by category
        if (categoryFilter !== "All Categories") {
            filtered = filtered?.filter(course => course.category?.name === categoryFilter);
        }

        // Filter by status
        if (statusFilter !== "All Status") {
            filtered = filtered?.filter(course => {
                if (statusFilter === "Published") return course.isPublished;
                if (statusFilter === "Draft") return !course.isPublished;
                return true;
            });
        }

        // Search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered?.filter(course =>
                course.name?.toLowerCase().includes(searchLower) ||
                course.category?.name?.toLowerCase().includes(searchLower) ||
                course.instructor?.name?.toLowerCase().includes(searchLower)
            );
        }

        return filtered || [];
    }, [courses, statusFilter, categoryFilter, searchTerm]);



    // Get selected course for details modal
    const selectedCourse = useMemo(() => {
        return courses?.data?.find(course => course.id === selectedCourseId);
    }, [courses, selectedCourseId]);

    // Create table columns with action handlers
    const columns = createCourseTableColumns({
        onViewDetails: setSelectedCourseId,
        onEdit: (courseId) => {
            const course = courses?.data?.find(c => c.id === courseId);
            setEditingCourse(course);
        },
        onDelete: handleDeleteCourse,
        onToggleStatus: handleToggleCourseStatus,
        onToggleActiveStatus: handleToggleActiveStatus,
        onTogglePublicStatus: handleTogglePublicStatus,
        onViewEnrollments: (courseId) => {
            setEnrollmentCourseId(courseId);
        },
        loadingStates
    });

    // Handle form submission
    const handleFormSubmit = async (courseData) => {
        let success = false;

        if (editingCourse) {
            success = await handleUpdateCourse(editingCourse.id, courseData);
        } else {
            success = await handleCreateCourse(courseData);
        }

        if (success) {
            setShowCreateForm(false);
            setEditingCourse(null);
        }
    };

    if (coursesError) {
        return <CourseErrorDisplay error={coursesError} onRetry={refetchCourses} />;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Course Management
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Manage your courses, content, and student enrollments.
                </p>
            </div>

            {/* Stats Cards */}
            <CourseStatsCards stats={stats?.data} statsLoading={statsLoading} />

            {/* Actions Bar */}
            <CourseActionsBar
                setShowCreateForm={setShowCreateForm}
                courses={filteredCourses}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                categories={categories}
                categoriesLoading={categoriesLoading}
            />

            {/* Courses DataTable */}
            <DataTable
                data={filteredCourses}
                columns={columns}
                title="All Courses"
                searchPlaceholder="Search courses by name, category, or instructor..."
                searchKeys={['name', 'category.name', 'instructor.name']}
                itemsPerPage={10}
                loading={coursesLoading}
                emptyMessage="No courses found"
                onRowClick={(course) => setSelectedCourseId(course.id)}
            />

            {/* Course Creation/Edit Form Modal */}
            {(showCreateForm || editingCourse) && (
                <CourseForm
                    course={editingCourse}
                    onSubmit={handleFormSubmit}
                    onClose={() => {
                        setShowCreateForm(false);
                        setEditingCourse(null);
                    }}
                    isLoading={loadingStates[editingCourse?.id] || false}
                />
            )}

            {/* Course Details Modal */}
            {selectedCourse && (
                <CourseDetailsModal
                    course={selectedCourse}
                    onClose={() => setSelectedCourseId(null)}
                    onEdit={(courseId) => {
                        setSelectedCourseId(null);
                        const course = courses ? courses?.data?.find(c => c.id === courseId) : null;
                        setEditingCourse(course);
                    }}
                />
            )}

            {/* Course Enrollment Modal */}
            {enrollmentCourseId && (
                <CourseEnrollmentModal
                    courseId={enrollmentCourseId}
                    courseTitle={courses?.data?.find(c => c.id === enrollmentCourseId)?.name || "Course"}
                    onClose={() => setEnrollmentCourseId(null)}
                />
            )}
        </div>
    );
};

export default CoursesPage;
