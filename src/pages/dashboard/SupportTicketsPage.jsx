import React, { useState } from "react";
import {
    useGetSupportTicketsQuery,
    useGetSupportTicketStatsQuery,
    useGetMentorsQuery,
} from "@/features/support-tickets-apis/supportticketsApis";
import { useSupportTicketActions } from "@/hooks/useSupportTicketActions";
import { toast } from "react-hot-toast";
import {
    SupportTicketsHeader,
    SupportTicketsStatsCards,
    SupportTicketsTable,
    AssignTicketModal,
    TicketDetailsModal,
    ErrorDisplay,
    getStatusBadge,
} from "@/components/support-tickets";

const SupportTicketsPage = () => {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [assignFormData, setAssignFormData] = useState({
        mentorId: "",
        meetLink: "",
    });

    // API hooks
    const { data: tickets = [], isLoading, error, refetch } = useGetSupportTicketsQuery();
    const { data: stats, isLoading: statsLoading } = useGetSupportTicketStatsQuery();
    const { data: mentorsData, isLoading: mentorsLoading } = useGetMentorsQuery();
    const mentors = mentorsData?.data || [];

    // Support ticket actions hook
    const {
        handleAssignTicket,
        handleCloseTicket,
        handleDeleteTicket,
        loadingStates
    } = useSupportTicketActions(refetch);

    // Handle assign ticket from modal
    const handleAssignTicketFromModal = async () => {
        if (!selectedTicket || !assignFormData.mentorId) {
            toast.error("Please select a mentor");
            return;
        }

        await handleAssignTicket(selectedTicket.id, assignFormData.mentorId, assignFormData.meetLink);
        setShowAssignModal(false);
        setAssignFormData({ mentorId: "", meetLink: "" });
        setSelectedTicket(null);
    };

    if (error) {
        return <ErrorDisplay error={error} onRetry={refetch} />;
    }

    return (
        <div className="space-y-6">
            <SupportTicketsHeader />

            <SupportTicketsStatsCards stats={stats} isLoading={statsLoading} />

            <SupportTicketsTable
                tickets={tickets}
                isLoading={isLoading}
                onViewDetails={(ticket) => {
                    setSelectedTicket(ticket);
                    setShowDetailsModal(true);
                }}
                onAssignTicket={(ticket) => {
                    setSelectedTicket(ticket);
                    setShowAssignModal(true);
                }}
                onCloseTicket={handleCloseTicket}
                onDeleteTicket={handleDeleteTicket}
                loadingStates={loadingStates}
                getStatusBadge={getStatusBadge}
            />

            <AssignTicketModal
                isOpen={showAssignModal}
                onClose={() => {
                    setShowAssignModal(false);
                    setAssignFormData({ mentorId: "", meetLink: "" });
                    setSelectedTicket(null);
                }}
                assignFormData={assignFormData}
                setAssignFormData={setAssignFormData}
                mentors={mentors}
                mentorsLoading={mentorsLoading}
                onAssign={handleAssignTicketFromModal}
                onCloseTicket={handleCloseTicket}
                selectedTicket={selectedTicket}
                loadingStates={loadingStates}
            />

            <TicketDetailsModal
                isOpen={showDetailsModal}
                onClose={() => {
                    setShowDetailsModal(false);
                    setSelectedTicket(null);
                }}
                selectedTicket={selectedTicket}
                getStatusBadge={getStatusBadge}
            />
        </div>
    );
};

export default SupportTicketsPage;
