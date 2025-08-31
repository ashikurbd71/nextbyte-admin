import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ExternalLink } from "lucide-react";

const TicketDetailsModal = ({
    isOpen,
    onClose,
    selectedTicket,
    getStatusBadge,
}) => {
    if (!selectedTicket) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Ticket Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-sm font-medium text-gray-500">Serial Number</Label>
                            <p className="text-lg font-semibold">#{selectedTicket.serialNumber}</p>
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-500">Status</Label>
                            <div className="mt-1">{getStatusBadge(selectedTicket.status)}</div>
                        </div>
                    </div>

                    <div>
                        <Label className="text-sm font-medium text-gray-500">Title</Label>
                        <p className="text-lg font-semibold">{selectedTicket.title}</p>
                    </div>

                    <div>
                        <Label className="text-sm font-medium text-gray-500">Description</Label>
                        <p className="text-gray-700">{selectedTicket.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-sm font-medium text-gray-500">User</Label>
                            <div className="mt-1">
                                <p className="font-medium">{selectedTicket.user.name}</p>
                                <p className="text-sm text-gray-500">{selectedTicket.user.email}</p>
                            </div>
                        </div>
                        {selectedTicket.mentor && (
                            <div>
                                <Label className="text-sm font-medium text-gray-500">Mentor</Label>
                                <div className="mt-1">
                                    <p className="font-medium">{selectedTicket.mentor.name}</p>
                                    <p className="text-sm text-gray-500">{selectedTicket.mentor.email}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {selectedTicket.meetLink && (
                        <div>
                            <Label className="text-sm font-medium text-gray-500">Meeting Link</Label>
                            <div className="mt-1">
                                <a
                                    href={selectedTicket.meetLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                >
                                    {selectedTicket.meetLink}
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-sm font-medium text-gray-500">Created</Label>
                            <p className="text-sm">{new Date(selectedTicket.createdAt).toLocaleString()}</p>
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-500">Updated</Label>
                            <p className="text-sm">{new Date(selectedTicket.updatedAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TicketDetailsModal;
