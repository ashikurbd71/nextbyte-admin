import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, AlertCircle } from "lucide-react";
import Loader from "@/components/loader/Loader";

// Hooks
import { useEnrollments } from "@/hooks/useEnrollments";

// Components
import { EnrollmentStats, EnrollmentFilters, EnrollmentList } from "@/components/enrollment";

// Utils
import { formatDate, formatCurrency } from "@/utils/formatters";

const EnrollmentsPage = () => {
    const navigate = useNavigate();

    // Custom hook for enrollment logic
    const {
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        paymentStatusFilter,
        setPaymentStatusFilter,
        filteredEnrollments,
        stats,
        isLoading,
        statsLoading,
        isDeleting,
        error,
        refetch,
        handleDeleteEnrollment
    } = useEnrollments();







    if (isLoading || statsLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader variant="ring" size="lg" text="Loading enrollments..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Card className="w-full max-w-md">
                        <CardContent className="p-6 text-center">
                            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Error Loading Enrollments</h3>
                            <p className="text-slate-600 mb-4">
                                Failed to load enrollment data. Please try again.
                            </p>
                            <Button onClick={() => refetch()}>
                                Retry
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Enrollments Management
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Manage all course enrollments and payments
                    </p>
                </div>
                <Button
                    onClick={() => navigate("/manual-payment")}
                    className="flex items-center space-x-2"
                >
                    <Plus className="h-4 w-4" />
                    <span>Manual Payment</span>
                </Button>
            </div>

            {/* Statistics Cards */}
            <EnrollmentStats stats={stats} formatCurrency={formatCurrency} />

            {/* Filters and Search */}
            <EnrollmentFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                paymentStatusFilter={paymentStatusFilter}
                setPaymentStatusFilter={setPaymentStatusFilter}
            />

            {/* Enrollments List */}
            <EnrollmentList
                filteredEnrollments={filteredEnrollments}
                formatDate={formatDate}
                formatCurrency={formatCurrency}
                onView={(enrollmentId) => navigate(`/enrollments/${enrollmentId}`)}
                onDelete={handleDeleteEnrollment}
                isDeleting={isDeleting}
            />
        </div>
    );
};

export default EnrollmentsPage;
