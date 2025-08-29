import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCourseByIdQuery, useSendEmailToEnrollmentsMutation, useSendEmailToStudentMutation } from "@/features/course-apis/coursesApis";
import { useGetUserEnrollmentPerformanceQuery } from "@/features/user/userApis";
import { exportToExcel } from "@/utils/excel-export";
import { toast } from "react-hot-toast";
import Loader from "@/components/loader/Loader";

// Import new components
import CourseEnrollmentHeader from "@/components/course/CourseEnrollmentHeader";
import CourseInfoCard from "@/components/course/CourseInfoCard";
import EnrollmentActionsBar from "@/components/course/EnrollmentActionsBar";
import EnrollmentTable from "@/components/course/EnrollmentTable";
import EmailModal from "@/components/course/EmailModal";
import StudentProgressModal from "@/components/course/StudentProgressModal";
import ErrorDisplay from "@/components/course/ErrorDisplay";

// Import utilities
import {
    getStatusColor,
    getProgressColor,
    formatCurrency,
    formatDate,
    filterEnrollments,
    formatEnrollmentDataForExport
} from "@/utils/enrollmentUtils";

const CourseEnrollmentViewPage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    // State for search and filters
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showMailModal, setShowMailModal] = useState(false);
    const [showIndividualMailModal, setShowIndividualMailModal] = useState(false);
    const [showProgressModal, setShowProgressModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [mailForm, setMailForm] = useState({
        title: "",
        description: "",
        link: ""
    });

    // Fetch course details and detailed enrollments
    const { data: course, isLoading: courseLoading, error: courseError } = useGetCourseByIdQuery(courseId);
    const [sendEmailToEnrollments, { isLoading: isSendingEmail }] = useSendEmailToEnrollmentsMutation();
    const [sendEmailToStudent, { isLoading: isSendingIndividualEmail }] = useSendEmailToStudentMutation();

    // Get student progress data when modal is open
    const { data: studentProgress, isLoading: progressLoading } = useGetUserEnrollmentPerformanceQuery(selectedStudent?.id, {
        skip: !selectedStudent?.id || !showProgressModal,
    });

    // Get enrollments from course data
    const enrollments = course?.data?.students || [];

    // Filter enrollments using utility function
    const filteredEnrollments = filterEnrollments(enrollments, searchTerm, statusFilter);

    // Handle Excel export
    const handleExportToExcel = () => {
        if (!filteredEnrollments || filteredEnrollments.length === 0) {
            toast.error("No enrollment data to export");
            return;
        }

        try {
            const exportData = formatEnrollmentDataForExport(filteredEnrollments);
            const filename = `${course?.name || 'Course'}_enrollments_${new Date().toISOString().split('T')[0]}.xlsx`;
            const success = exportToExcel(exportData, filename, 'Course Enrollments');

            if (success) {
                toast.success(`Successfully exported ${filteredEnrollments.length} enrollments to Excel`);
            } else {
                toast.error("Failed to export enrollments");
            }
        } catch (error) {
            console.error("Export error:", error);
            toast.error("Error exporting enrollments");
        }
    };

    // Handle send mail to all students
    const handleSendMail = async (e) => {
        e.preventDefault();

        if (!mailForm.title.trim() || !mailForm.description.trim()) {
            toast.error("Please fill in title and description");
            return;
        }

        try {
            const emailData = {
                title: mailForm.title,
                description: mailForm.description,
                link: mailForm.link || null
            };

            await sendEmailToEnrollments({ courseId, emailData }).unwrap();
            toast.success("Email sent successfully to all enrolled students!");
            setShowMailModal(false);
            setMailForm({ title: "", description: "", link: "" });
        } catch (error) {
            toast.error(error?.data?.message || "Failed to send email");
        }
    };

    // Handle send individual mail
    const handleSendIndividualMail = async (e) => {
        e.preventDefault();

        if (!mailForm.title.trim() || !mailForm.description.trim()) {
            toast.error("Please fill in title and description");
            return;
        }

        if (!selectedStudent) {
            toast.error("No student selected");
            return;
        }

        try {
            const emailData = {
                title: mailForm.title,
                description: mailForm.description,
                link: mailForm.link || null
            };

            await sendEmailToStudent({ studentId: selectedStudent.id, courseId, emailData }).unwrap();
            toast.success(`Email sent successfully to ${selectedStudent.name}!`);
            setShowIndividualMailModal(false);
            setSelectedStudent(null);
            setMailForm({ title: "", description: "", link: "" });
        } catch (error) {
            toast.error(error?.data?.message || "Failed to send email");
        }
    };

    // Handle view progress
    const handleViewProgress = (student) => {
        setSelectedStudent(student);
        setShowProgressModal(true);
    };

    // Handle send individual mail
    const handleSendIndividualMailClick = (student) => {
        setSelectedStudent(student);
        setShowIndividualMailModal(true);
    };

    // Handle close progress modal
    const handleCloseProgressModal = () => {
        setShowProgressModal(false);
        setSelectedStudent(null);
    };

    // Handle close individual mail modal
    const handleCloseIndividualMailModal = () => {
        setShowIndividualMailModal(false);
        setSelectedStudent(null);
    };

    if (courseLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader variant="ring" size="lg" text="Loading course enrollments..." />
            </div>
        );
    }

    if (courseError) {
        return <ErrorDisplay onGoBack={() => navigate(-1)} />;
    }

    return (
        <div className="container mx-auto px-4 py-6 space-y-6">
            {/* Header */}
            <CourseEnrollmentHeader
                course={course}
                enrollmentsCount={enrollments.length}
            />

            {/* Course Info Card */}
            <CourseInfoCard
                course={course}
                enrollmentsCount={enrollments.length}
            />

            {/* Actions Bar */}
            <EnrollmentActionsBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                onExport={handleExportToExcel}
                onSendMail={() => setShowMailModal(true)}
                filteredEnrollmentsCount={filteredEnrollments.length}
                hasEnrollments={filteredEnrollments.length > 0}
            />

            {/* Enrollments List */}
            <EnrollmentTable
                filteredEnrollments={filteredEnrollments}
                searchTerm={searchTerm}
                statusFilter={statusFilter}
                onViewProgress={handleViewProgress}
                onSendIndividualMail={handleSendIndividualMailClick}
                getStatusColor={getStatusColor}
                getProgressColor={getProgressColor}
            />

            {/* Send Mail Modal */}
            <EmailModal
                isOpen={showMailModal}
                onClose={() => setShowMailModal(false)}
                onSubmit={handleSendMail}
                mailForm={mailForm}
                setMailForm={setMailForm}
                isLoading={isSendingEmail}
                title="Send Email to Enrolled Students"
                recipientInfo={`${filteredEnrollments.length} enrolled students`}
            />

            {/* Individual Send Mail Modal */}
            <EmailModal
                isOpen={showIndividualMailModal}
                onClose={handleCloseIndividualMailModal}
                onSubmit={handleSendIndividualMail}
                mailForm={mailForm}
                setMailForm={setMailForm}
                isLoading={isSendingIndividualEmail}
                title={`Send Email to ${selectedStudent?.name}`}
                recipientInfo={`${selectedStudent?.name} (${selectedStudent?.email})`}
                isIndividual={true}
            />

            {/* Student Progress Modal */}
            <StudentProgressModal
                isOpen={showProgressModal}
                onClose={handleCloseProgressModal}
                selectedStudent={selectedStudent}
                studentProgress={studentProgress}
                progressLoading={progressLoading}
                getStatusColor={getStatusColor}
                getProgressColor={getProgressColor}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
            />
        </div>
    );
};

export default CourseEnrollmentViewPage;
