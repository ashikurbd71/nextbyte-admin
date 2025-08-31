import { useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import {
    useGetAllEnrollmentsQuery,
    useGetEnrollmentStatisticsQuery,
    useDeleteEnrollmentMutation
} from "@/features/enrollment-apis/enrollmentApis";

export const useEnrollments = () => {
    // State
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");

    // API hooks
    const { data: enrollments = [], isLoading, error, refetch } = useGetAllEnrollmentsQuery();
    const { data: stats, isLoading: statsLoading } = useGetEnrollmentStatisticsQuery();
    const [deleteEnrollment, { isLoading: isDeleting }] = useDeleteEnrollmentMutation();

    // Filter enrollments
    const filteredEnrollments = useMemo(() => {
        return enrollments.filter(enrollment => {
            const matchesSearch =
                enrollment.student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                enrollment.student?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                enrollment.course?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                enrollment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === "all" || enrollment.status === statusFilter;
            const matchesPaymentStatus = paymentStatusFilter === "all" || enrollment.paymentStatus === paymentStatusFilter;

            return matchesSearch && matchesStatus && matchesPaymentStatus;
        });
    }, [enrollments, searchTerm, statusFilter, paymentStatusFilter]);

    // Handle delete enrollment
    const handleDeleteEnrollment = async (enrollmentId) => {
        if (window.confirm("Are you sure you want to delete this enrollment?")) {
            try {
                await deleteEnrollment(enrollmentId).unwrap();
                toast.success("Enrollment deleted successfully");
            } catch (error) {
                console.error("Error deleting enrollment:", error);
                toast.error("Failed to delete enrollment");
            }
        }
    };

    return {
        // State
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        paymentStatusFilter,
        setPaymentStatusFilter,

        // Data
        enrollments,
        filteredEnrollments,
        stats,

        // Loading states
        isLoading,
        statsLoading,
        isDeleting,

        // Error
        error,

        // Actions
        refetch,
        handleDeleteEnrollment
    };
};
