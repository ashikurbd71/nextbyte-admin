import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
    useGetLessonsQuery,
    useGetLessonStatisticsQuery,
} from "@/features/lession-apis/lessionApis";
import { useGetModulesQuery } from "@/features/modules-apis/moduleApis";
import {
    LessonForm,
    LessonDetailsModal,
    LessonStatsCards,
    LessonActionsBar,
    LessonErrorDisplay,
    LessonTable,
    createLessonTableColumns,
} from "@/components/lesson";
import { useLessonActions } from "@/hooks/useLessonActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const LessonsPage = () => {
    const navigate = useNavigate();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [selectedLessonId, setSelectedLessonId] = useState(null);
    const [editingLesson, setEditingLesson] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [moduleFilter, setModuleFilter] = useState("All Modules");
    const [contentTypeFilter, setContentTypeFilter] = useState("All Types");

    // API hooks
    const {
        data: lessons = [],
        isLoading: lessonsLoading,
        error: lessonsError,
        refetch: refetchLessons
    } = useGetLessonsQuery();

    const { data: stats, isLoading: statsLoading } = useGetLessonStatisticsQuery();

    // Get modules from API
    const { data: modulesData, isLoading: modulesLoading } = useGetModulesQuery();
    const modules = modulesData || [];

    // Lesson actions hook
    const {
        handleCreateLesson,
        handleUpdateLesson,
        handleDeleteLesson,
        handleToggleLessonStatus,
        handleToggleLessonPreview,
        loadingStates
    } = useLessonActions(refetchLessons);

    // Filter and search lessons
    const filteredLessons = useMemo(() => {
        let filtered = lessons;

        // Filter by module
        if (moduleFilter !== "All Modules") {
            filtered = filtered?.filter(lesson => lesson.module?.title === moduleFilter);
        }

        // Filter by status
        if (statusFilter !== "All Status") {
            filtered = filtered?.filter(lesson => {
                if (statusFilter === "Active") return lesson.isActive;
                if (statusFilter === "Inactive") return !lesson.isActive;
                return true;
            });
        }

        // Filter by content type
        if (contentTypeFilter !== "All Types") {
            filtered = filtered?.filter(lesson => {
                if (contentTypeFilter === "Video") return lesson.videoUrl;
                if (contentTypeFilter === "File") return lesson.fileUrl;
                if (contentTypeFilter === "Text") return lesson.text;
                if (contentTypeFilter === "None") return !lesson.videoUrl && !lesson.fileUrl && !lesson.text;
                return true;
            });
        }

        // Search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered?.filter(lesson =>
                lesson.title?.toLowerCase().includes(searchLower) ||
                lesson.module?.title?.toLowerCase().includes(searchLower) ||
                lesson.description?.toLowerCase().includes(searchLower)
            );
        }

        return filtered || [];
    }, [lessons, statusFilter, moduleFilter, contentTypeFilter, searchTerm]);

    // Get selected lesson for details modal
    const selectedLesson = useMemo(() => {
        return lessons?.find(lesson => lesson.id === selectedLessonId);
    }, [lessons, selectedLessonId]);

    // Handle edit lesson - FIXED: This function was missing proper implementation
    const handleEditLesson = (lesson) => {
        setEditingLesson(lesson);
        setShowCreateForm(true);
    };

    // Create table columns with action handlers - FIXED: Now properly passing handleEditLesson
    const tableColumns = useMemo(() => {
        return createLessonTableColumns({
            onViewDetails: (lesson) => setSelectedLessonId(lesson.id),
            onEdit: handleEditLesson, // FIXED: Now properly passing the function
            onDelete: handleDeleteLesson,
            onToggleStatus: handleToggleLessonStatus,
            onTogglePreview: handleToggleLessonPreview,
            loadingStates
        });
    }, [handleDeleteLesson, handleToggleLessonStatus, handleToggleLessonPreview, loadingStates]);

    // Handle form submission
    const handleFormSubmit = async (formData) => {
        try {
            if (editingLesson) {
                await handleUpdateLesson({ id: editingLesson.id, ...formData });
            } else {
                await handleCreateLesson(formData);
            }
            setShowCreateForm(false);
            setEditingLesson(null);
        } catch (error) {
            // Error already handled in the hook
        }
    };

    // Handle form close
    const handleFormClose = () => {
        setShowCreateForm(false);
        setEditingLesson(null);
    };

    // Handle create lesson
    const handleCreateLessonClick = () => {
        setEditingLesson(null);
        setShowCreateForm(true);
    };

    // Handle export
    const handleExport = () => {
        // TODO: Implement export functionality
        console.log("Export lessons");
    };

    // Handle import
    const handleImport = () => {
        // TODO: Implement import functionality
        console.log("Import lessons");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <h1 className="text-2xl font-bold">Lessons Management</h1>
                </div>
            </div>

            {/* Stats Cards */}
            <LessonStatsCards stats={stats} isLoading={statsLoading} />

            {/* Actions Bar */}
            <LessonActionsBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                moduleFilter={moduleFilter}
                setModuleFilter={setModuleFilter}
                contentTypeFilter={contentTypeFilter}
                setContentTypeFilter={setContentTypeFilter}
                modules={modules}
                onCreateLesson={handleCreateLessonClick}
                onExport={handleExport}
                onImport={handleImport}
            />

            {/* Error Display */}
            <LessonErrorDisplay error={lessonsError} onRetry={refetchLessons} />

            {/* Lessons Table */}
            <Card className="shadow-sm border-0">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold flex items-center justify-between">
                        <span>Lessons</span>
                        <span className="text-sm font-normal text-muted-foreground">
                            {filteredLessons.length} lesson{filteredLessons.length !== 1 ? 's' : ''}
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <LessonTable
                        data={filteredLessons}
                        headers={tableColumns}
                        isLoading={lessonsLoading}
                    />
                </CardContent>
            </Card>

            {/* Modals */}
            {showCreateForm && (
                <LessonForm
                    lesson={editingLesson}
                    onSubmit={handleFormSubmit}
                    onClose={handleFormClose}
                    isLoading={loadingStates.create || loadingStates.update}
                />
            )}

            {selectedLesson && (
                <LessonDetailsModal
                    lesson={selectedLesson}
                    isOpen={!!selectedLessonId}
                    onClose={() => setSelectedLessonId(null)}
                />
            )}
        </div>
    );
};

export default LessonsPage;
