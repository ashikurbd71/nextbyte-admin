import React, { useState, useMemo } from 'react';
import {
    AssignmentSubmissionTable,
    AssignmentSubmissionActionsBar,
    AssignmentSubmissionDetailsModal,
    AssignmentSubmissionStatsCards,
    AssignmentSubmissionErrorDisplay,
    AssignmentSubmissionReviewModal,
    StudentPerformanceModal
} from '@/components/assignment-submission';
import {
    useGetAssignmentSubmissionsQuery,
    useGetSubmissionStatisticsQuery,
    useGetStudentPerformanceQuery
} from '@/features/assignmentsubmesion-apis/assignmentsubmesionApis';
import { useGetAssignmentsQuery as useGetAllAssignmentsQuery } from '@/features/assignment-apis/assignmentApis';
import { useAssignmentSubmissionActions } from '@/hooks/useAssignmentSubmissionActions';
import useTitle from '@/hooks/useTitle';
import { exportToExcel } from '@/utils/excel-export';
import toast from 'react-hot-toast';

const AssignmentSubmissionsPage = () => {
    useTitle('Assignment Submissions - Admin Dashboard');

    // State management
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [showPerformance, setShowPerformance] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        status: 'all',
        assignmentId: 'all',
        studentId: 'all'
    });

    // API hooks
    const { data: submissions, isLoading, error, refetch } = useGetAssignmentSubmissionsQuery();
    const { data: statistics, isLoading: statsLoading } = useGetSubmissionStatisticsQuery();
    const { data: assignments } = useGetAllAssignmentsQuery();
    const { data: studentPerformance, isLoading: performanceLoading } = useGetStudentPerformanceQuery(
        selectedStudentId,
        { skip: !selectedStudentId }
    );

    const submissionActions = useAssignmentSubmissionActions(refetch);

    // Extract unique students for filter
    const students = useMemo(() => {
        if (!submissions) return [];
        const uniqueStudents = new Map();
        submissions.forEach(submission => {
            if (submission.student && !uniqueStudents.has(submission.student.id)) {
                uniqueStudents.set(submission.student.id, submission.student);
            }
        });
        return Array.from(uniqueStudents.values());
    }, [submissions]);

    // Filtered submissions
    const filteredSubmissions = useMemo(() => {
        if (!submissions) return [];

        return submissions.filter(submission => {
            // Search filter
            const matchesSearch = searchTerm === '' ||
                submission.student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                submission.student?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                submission.assignment?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                submission.description?.toLowerCase().includes(searchTerm.toLowerCase());

            // Status filter
            const matchesStatus = filters.status === 'all' || submission.status === filters.status;

            // Assignment filter
            const matchesAssignment = filters.assignmentId === 'all' ||
                submission.assignmentId?.toString() === filters.assignmentId;

            // Student filter
            const matchesStudent = filters.studentId === 'all' ||
                submission.studentId?.toString() === filters.studentId;

            return matchesSearch && matchesStatus && matchesAssignment && matchesStudent;
        });
    }, [submissions, searchTerm, filters]);

    // Event handlers
    const handleView = (submission) => {
        setSelectedSubmission(submission);
        setShowDetails(true);
    };



    const handleDelete = async (submission) => {
        await submissionActions.deleteSubmission(submission.id);
    };

    const handleReview = (submission) => {
        setSelectedSubmission(submission);
        setShowReview(true);
    };

    const handleReviewSubmit = async (reviewData) => {
        const success = await submissionActions.reviewSubmission(reviewData);
        if (success) {
            setShowReview(false);
            setSelectedSubmission(null);
        }
    };

    const handleViewPerformance = (studentId) => {
        setSelectedStudentId(studentId);
        setShowPerformance(true);
    };

    const handleSearch = (search) => {
        setSearchTerm(search);
    };

    const handleFilter = (newFilters) => {
        setFilters(newFilters);
    };

    const handleExport = () => {
        if (!filteredSubmissions || filteredSubmissions.length === 0) {
            toast.error("No submission data to export");
            return;
        }

        const exportData = filteredSubmissions.map(submission => ({
            'Student Name': submission.student?.name || 'N/A',
            'Student Email': submission.student?.email || 'N/A',
            'Assignment Title': submission.assignment?.title || 'N/A',
            'Description': submission.description || 'N/A',
            'Status': submission.status || 'N/A',
            'Marks': submission.marks || 'Not graded',
            'Total Marks': submission.assignment?.totalMarks || 'N/A',
            'Feedback': submission.feedback || 'N/A',
            'GitHub Link': submission.githubLink || 'N/A',
            'Live Link': submission.liveLink || 'N/A',
            'File URL': submission.fileUrl || 'N/A',
            'Submitted Date': submission.createdAt ? new Date(submission.createdAt).toLocaleDateString() : 'N/A',
            'Reviewed Date': submission.reviewedAt ? new Date(submission.reviewedAt).toLocaleDateString() : 'N/A',
            'Last Updated': submission.updatedAt ? new Date(submission.updatedAt).toLocaleDateString() : 'N/A'
        }));

        const filename = `assignment_submissions_${new Date().toISOString().split('T')[0]}.xlsx`;
        const success = exportToExcel(exportData, filename, 'Assignment Submissions');

        if (success) {
            toast.success(`Successfully exported ${filteredSubmissions.length} submissions to Excel`);
        } else {
            toast.error("Failed to export submissions");
        }
    };

    const handleRetry = () => {
        refetch();
    };

    // Error handling
    if (error) {
        return (
            <AssignmentSubmissionErrorDisplay
                error={error}
                onRetry={handleRetry}
                title="Error Loading Assignment Submissions"
            />
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Assignment Submissions</h1>
                    <p className="text-muted-foreground">
                        Review and manage student assignment submissions
                    </p>
                </div>
            </div>

            {/* Statistics Cards */}
            <AssignmentSubmissionStatsCards
                statistics={statistics}
                isLoading={statsLoading}
            />

            {/* Actions Bar */}
            <AssignmentSubmissionActionsBar
                onSearch={handleSearch}
                onFilter={handleFilter}
                onExport={handleExport}
                onRefresh={refetch}
                searchValue={searchTerm}
                selectedStatus={filters.status}
                selectedAssignment={filters.assignmentId}
                selectedStudent={filters.studentId}
                assignments={assignments || []}
                students={students}
                isLoading={isLoading}
            />

            {/* Submissions Table */}
            <AssignmentSubmissionTable
                submissions={filteredSubmissions}
                onView={handleView}
                onDelete={handleDelete}
                onReview={handleReview}
                onViewPerformance={handleViewPerformance}
                isLoading={isLoading}
            />

            {/* Details Modal */}
            {showDetails && selectedSubmission && (
                <AssignmentSubmissionDetailsModal
                    submission={selectedSubmission}
                    isOpen={showDetails}
                    onClose={() => {
                        setShowDetails(false);
                        setSelectedSubmission(null);
                    }}
                    onReview={handleReview}
                />
            )}

            {/* Review Modal */}
            {showReview && selectedSubmission && (
                <AssignmentSubmissionReviewModal
                    submission={selectedSubmission}
                    isOpen={showReview}
                    onClose={() => {
                        setShowReview(false);
                        setSelectedSubmission(null);
                    }}
                    onSubmit={handleReviewSubmit}
                    isLoading={submissionActions.isReviewing}
                />
            )}

            {/* Student Performance Modal */}
            {showPerformance && selectedStudentId && (
                <StudentPerformanceModal
                    studentId={selectedStudentId}
                    performance={studentPerformance}
                    isOpen={showPerformance}
                    onClose={() => {
                        setShowPerformance(false);
                        setSelectedStudentId(null);
                    }}
                    isLoading={performanceLoading}
                />
            )}
        </div>
    );
};

export default AssignmentSubmissionsPage;
