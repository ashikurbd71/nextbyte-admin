import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AssignTicketModal = ({
    isOpen,
    onClose,
    assignFormData,
    setAssignFormData,
    mentors,
    mentorsLoading,
    onAssign,
    onCloseTicket,
    selectedTicket,
    loadingStates,
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Assign Ticket</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="mentorId">Mentor</Label>
                        <Select
                            value={assignFormData.mentorId}
                            onValueChange={(value) => setAssignFormData(prev => ({ ...prev, mentorId: value }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a mentor" />
                            </SelectTrigger>
                            <SelectContent>
                                {mentorsLoading ? (
                                    <SelectItem value="" disabled>Loading mentors...</SelectItem>
                                ) : mentors.length === 0 ? (
                                    <SelectItem value="" disabled>No mentors available</SelectItem>
                                ) : (
                                    mentors.map((mentor) => (
                                        <SelectItem key={mentor.id} value={mentor.id.toString()}>
                                            {mentor.name} ({mentor.email})
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="meetLink">Meeting Link (Optional)</Label>
                        <Input
                            id="meetLink"
                            type="url"
                            placeholder="https://meet.google.com/..."
                            value={assignFormData.meetLink}
                            onChange={(e) => setAssignFormData(prev => ({ ...prev, meetLink: e.target.value }))}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="outline"
                            onClick={async () => {
                                await onCloseTicket(selectedTicket?.id);
                                onClose();
                            }}
                            disabled={loadingStates[`close-${selectedTicket?.id}`]}
                        >
                            {loadingStates[`close-${selectedTicket?.id}`] ? "Closing..." : "Close Ticket"}
                        </Button>
                        <Button onClick={onAssign} disabled={loadingStates[`assign-${selectedTicket?.id}`]}>
                            {loadingStates[`assign-${selectedTicket?.id}`] ? "Assigning..." : "Assign Ticket"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AssignTicketModal;
