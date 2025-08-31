import { useState } from "react";
import { toast } from "react-hot-toast";
import {
    useAssignTicketMutation,
    useCloseTicketMutation,
    useDeleteSupportTicketMutation,
} from "@/features/support-tickets-apis/supportticketsApis";

export const useSupportTicketActions = (refetch) => {
    const [assignTicket, { isLoading: assigning }] = useAssignTicketMutation();
    const [closeTicket, { isLoading: closing }] = useCloseTicketMutation();
    const [deleteTicket, { isLoading: deleting }] = useDeleteSupportTicketMutation();

    const [loadingStates, setLoadingStates] = useState({});

    const handleAssignTicket = async (ticketId, mentorId, meetLink) => {
        if (!mentorId) {
            toast.error("Please select a mentor");
            return;
        }

        setLoadingStates(prev => ({ ...prev, [`assign-${ticketId}`]: true }));

        try {
            await assignTicket({
                id: ticketId,
                mentorId: parseInt(mentorId),
                meetLink,
            }).unwrap();

            toast.success("Ticket assigned successfully");
            if (refetch) refetch();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to assign ticket");
        } finally {
            setLoadingStates(prev => ({ ...prev, [`assign-${ticketId}`]: false }));
        }
    };

    const handleCloseTicket = async (ticketId) => {
        setLoadingStates(prev => ({ ...prev, [`close-${ticketId}`]: true }));

        try {
            await closeTicket(ticketId).unwrap();
            toast.success("Ticket closed successfully");
            if (refetch) refetch();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to close ticket");
        } finally {
            setLoadingStates(prev => ({ ...prev, [`close-${ticketId}`]: false }));
        }
    };

    const handleDeleteTicket = async (ticketId) => {
        if (window.confirm("Are you sure you want to delete this ticket?")) {
            setLoadingStates(prev => ({ ...prev, [`delete-${ticketId}`]: true }));

            try {
                await deleteTicket(ticketId).unwrap();
                toast.success("Ticket deleted successfully");
                if (refetch) refetch();
            } catch (error) {
                toast.error(error?.data?.message || "Failed to delete ticket");
            } finally {
                setLoadingStates(prev => ({ ...prev, [`delete-${ticketId}`]: false }));
            }
        }
    };

    return {
        handleAssignTicket,
        handleCloseTicket,
        handleDeleteTicket,
        loadingStates,
        assigning,
        closing,
        deleting,
    };
};
