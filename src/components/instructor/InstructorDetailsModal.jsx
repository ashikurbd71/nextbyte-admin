import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Mail,
    TrendingUp,
    DollarSign,
    Facebook,
    Linkedin,
    Instagram,
    Download,
    CreditCard
} from "lucide-react";
import InstructorIdCard from "./InstructorIdCard";

const InstructorDetailsModal = ({ instructor, onClose }) => {
    const [showIdCard, setShowIdCard] = useState(false);

    if (!instructor) return null;

    return (
        <>
            <Dialog open={!!instructor} onOpenChange={() => onClose()}>
                <DialogContent className="max-w-2xl max-h-[90vh]  overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Instructor Details</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={instructor.photoUrl} alt={instructor.name} />
                                <AvatarFallback className="text-lg">
                                    {instructor.name?.charAt(0)?.toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                            <div>
                                <h3 className="text-xl font-semibold">{instructor.name}</h3>
                                <p className="text-muted-foreground">{instructor.designation}</p>
                                <div className="flex gap-2 mt-2">
                                    <Badge variant={instructor.role === "super_admin" ? "destructive" : "default"}>
                                        {instructor.role}
                                    </Badge>
                                    <Badge variant="outline">{instructor.jobType}</Badge>
                                    <Badge variant={instructor.isActive ? "default" : "secondary"}>
                                        {instructor.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">Email:</span>
                                </div>
                                <p className="text-sm">{instructor.email}</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">Experience:</span>
                                </div>
                                <p className="text-sm">{instructor.experience} years</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">Salary:</span>
                                </div>
                                <p className="text-sm">${instructor.salary?.toLocaleString()}</p>
                            </div>
                        </div>

                        {instructor.bio && (
                            <>
                                <Separator />
                                <div className="space-y-2">
                                    <span className="text-sm font-medium">Bio:</span>
                                    <p className="text-sm text-muted-foreground">{instructor.bio}</p>
                                </div>
                            </>
                        )}

                        {instructor.expertise && instructor.expertise.length > 0 && (
                            <>
                                <Separator />
                                <div className="space-y-2">
                                    <span className="text-sm font-medium">Expertise:</span>
                                    <div className="flex flex-wrap gap-1">
                                        {instructor.expertise.map((skill, index) => (
                                            <Badge key={index} variant="" className="text-xs">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {(instructor.fbLink || instructor.linkedinLink || instructor.instaLink) && (
                            <>
                                <Separator />
                                <div className="space-y-2">
                                    <span className="text-sm font-medium">Social Links:</span>
                                    <div className="flex gap-2">
                                        {instructor.fbLink && (
                                            <Button variant="outline" size="sm" asChild>
                                                <a href={instructor.fbLink} target="_blank" rel="noopener noreferrer">
                                                    <Facebook className="h-4 w-4 mr-1" />
                                                    Facebook
                                                </a>
                                            </Button>
                                        )}
                                        {instructor.linkedinLink && (
                                            <Button variant="outline" size="sm" asChild>
                                                <a href={instructor.linkedinLink} target="_blank" rel="noopener noreferrer">
                                                    <Linkedin className="h-4 w-4 mr-1" />
                                                    LinkedIn
                                                </a>
                                            </Button>
                                        )}
                                        {instructor.instaLink && (
                                            <Button variant="outline" size="sm" asChild>
                                                <a href={instructor.instaLink} target="_blank" rel="noopener noreferrer">
                                                    <Instagram className="h-4 w-4 mr-1" />
                                                    Instagram
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}

                        <Separator />

                        {/* ID Card Actions */}
                        <div className="flex gap-2">
                            <Button
                                onClick={() => setShowIdCard(true)}
                                variant="outline"
                                className="flex items-center gap-2"
                            >
                                <CreditCard className="h-4 w-4" />
                                View ID Card
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* ID Card Modal */}
            <InstructorIdCard
                instructor={instructor}
                isOpen={showIdCard}
                onClose={() => setShowIdCard(false)}
            />
        </>
    );
};

export default InstructorDetailsModal;
