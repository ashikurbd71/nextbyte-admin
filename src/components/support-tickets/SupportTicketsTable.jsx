import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    User,
    Users,
    Clock,
    CheckCircle,
    Eye,
    Edit,
    Trash2,
    Loader2,
} from "lucide-react";

const SupportTicketsTable = ({
    tickets,
    isLoading,
    onViewDetails,
    onAssignTicket,
    onCloseTicket,
    onDeleteTicket,
    loadingStates,
    getStatusBadge,
}) => {
    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Support Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-32">
                        <div className="text-center">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                            <p>Loading tickets...</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (tickets.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Support Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <p className="text-gray-500">No support tickets found</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Support Tickets ({tickets.length})</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-3 font-medium">Serial</th>
                                <th className="text-left p-3 font-medium">Title</th>
                                <th className="text-left p-3 font-medium">User</th>
                                <th className="text-left p-3 font-medium">Status</th>
                                <th className="text-left p-3 font-medium">Mentor</th>
                                <th className="text-left p-3 font-medium">Created</th>
                                <th className="text-left p-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((ticket) => (
                                <tr key={ticket.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">#{ticket.serialNumber}</td>
                                    <td className="p-3">
                                        <div>
                                            <div className="font-medium">{ticket.title}</div>
                                            <div className="text-sm text-gray-500">{ticket.description}</div>
                                        </div>
                                    </td>
                                    <td className="p-3">
                                        <div>
                                            <div className="font-medium">{ticket.user.name}</div>
                                            <div className="text-sm text-gray-500">{ticket.user.email}</div>
                                        </div>
                                    </td>
                                    <td className="p-3">{getStatusBadge(ticket.status)}</td>
                                    <td className="p-3">
                                        {ticket.mentor ? (
                                            <div>
                                                <div className="font-medium">{ticket.mentor.name}</div>
                                                <div className="text-sm text-gray-500">{ticket.mentor.email}</div>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">Not assigned</span>
                                        )}
                                    </td>
                                    <td className="p-3">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onViewDetails(ticket)}
                                                title="View Details"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>

                                            {ticket.status === "open" && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => onAssignTicket(ticket)}
                                                    title="Assign Ticket"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            )}

                                            {ticket.status !== "closed" && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => onCloseTicket(ticket.id)}
                                                    disabled={loadingStates[`close-${ticket.id}`]}
                                                    title="Close Ticket"
                                                >
                                                    <CheckCircle className="h-4 w-4" />
                                                </Button>
                                            )}

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onDeleteTicket(ticket.id)}
                                                disabled={loadingStates[`delete-${ticket.id}`]}
                                                title="Delete Ticket"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};

export default SupportTicketsTable;
