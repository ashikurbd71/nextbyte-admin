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

const InstructorDetailsModal = ({ instructor, onClose }) => {
    const [showIdCard, setShowIdCard] = useState(false);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    if (!instructor) return null;

    const generateIdCardPDF = async () => {
        try {
            setIsGeneratingPDF(true);

            // Try multiple import methods for jsPDF
            let jsPDF;
            try {
                // Method 1: Dynamic import
                const module = await import('jspdf');
                jsPDF = module.jsPDF;
            } catch (importError) {
                console.log("Dynamic import failed, trying alternative method");
                // Method 2: Try global jsPDF if available
                if (window.jsPDF) {
                    jsPDF = window.jsPDF;
                } else {
                    throw new Error("jsPDF library not available");
                }
            }

            if (!jsPDF) {
                throw new Error("jsPDF library could not be loaded");
            }

            const doc = new jsPDF({
                orientation: "landscape",
                unit: "mm",
                format: "a6", // ID card size
            });

            // Colors
            const primaryColor = "#bd0000";
            const secondaryColor = "#3498db";
            const accentColor = "#f8f9fa";
            const textColor = "#333333";

            // Card dimensions (A6 landscape: 105 x 74 mm)
            const cardWidth = 105;
            const cardHeight = 74;
            const margin = 5;

            // Background gradient effect
            doc.setFillColor(primaryColor);
            doc.rect(0, 0, cardWidth, cardHeight, "F");

            // Inner white background
            doc.setFillColor("#ffffff");
            doc.rect(margin, margin, cardWidth - 2 * margin, cardHeight - 2 * margin, "F");

            // Header section with logo area
            doc.setFillColor(primaryColor);
            doc.rect(margin, margin, cardWidth - 2 * margin, 15, "F");

            // Institution name
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor("#ffffff");
            doc.text("NEXTBYTE EDUCATION", cardWidth / 2, margin + 10, { align: "center" });

            // ID Card title
            doc.setFontSize(8);
            doc.text("TEACHER IDENTIFICATION CARD", cardWidth / 2, margin + 20, { align: "center" });

            // Photo area (placeholder)
            doc.setFillColor(accentColor);
            doc.rect(margin + 5, margin + 25, 25, 35, "F");

            // Photo border
            doc.setDrawColor(primaryColor);
            doc.setLineWidth(0.5);
            doc.rect(margin + 5, margin + 25, 25, 35, "S");

            // Photo placeholder text
            doc.setFontSize(6);
            doc.setTextColor("#666666");
            doc.text("PHOTO", margin + 17.5, margin + 42.5, { align: "center" });

            // Teacher information
            const infoStartX = margin + 35;
            const infoStartY = margin + 28;
            const lineHeight = 6;

            doc.setFont("helvetica", "bold");
            doc.setFontSize(8);
            doc.setTextColor(textColor);

            // Name
            doc.text("Name:", infoStartX, infoStartY);
            doc.setFont("helvetica", "normal");
            doc.text(String(instructor.name || "N/A"), infoStartX + 15, infoStartY);

            // ID
            doc.setFont("helvetica", "bold");
            doc.text("ID:", infoStartX, infoStartY + lineHeight);
            doc.setFont("helvetica", "normal");
            doc.text(String(instructor.id || "N/A"), infoStartX + 15, infoStartY + lineHeight);

            // Designation
            doc.setFont("helvetica", "bold");
            doc.text("Designation:", infoStartX, infoStartY + lineHeight * 2);
            doc.setFont("helvetica", "normal");
            doc.text(String(instructor.designation || "N/A"), infoStartX + 25, infoStartY + lineHeight * 2);

            // Email
            doc.setFont("helvetica", "bold");
            doc.text("Email:", infoStartX, infoStartY + lineHeight * 3);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(6);
            doc.text(String(instructor.email || "N/A"), infoStartX + 15, infoStartY + lineHeight * 3);

            // Experience
            doc.setFont("helvetica", "bold");
            doc.setFontSize(8);
            doc.text("Experience:", infoStartX, infoStartY + lineHeight * 4);
            doc.setFont("helvetica", "normal");
            doc.text(`${String(instructor.experience || 0)} years`, infoStartX + 25, infoStartY + lineHeight * 4);

            // Role
            doc.setFont("helvetica", "bold");
            doc.text("Role:", infoStartX, infoStartY + lineHeight * 5);
            doc.setFont("helvetica", "normal");
            doc.text(String(instructor.role || "N/A"), infoStartX + 15, infoStartY + lineHeight * 5);

            // Status badge
            const statusColor = instructor.isActive ? "#10b981" : "#ef4444";
            doc.setFillColor(statusColor);
            doc.rect(infoStartX + 50, infoStartY + lineHeight * 5 - 3, 15, 5, "F");
            doc.setFontSize(6);
            doc.setTextColor("#ffffff");
            doc.text(instructor.isActive ? "ACTIVE" : "INACTIVE", infoStartX + 57.5, infoStartY + lineHeight * 5, { align: "center" });

            // Footer
            doc.setFillColor(primaryColor);
            doc.rect(margin, cardHeight - margin - 8, cardWidth - 2 * margin, 8, "F");

            // Issue date
            doc.setFontSize(6);
            doc.setTextColor("#ffffff");
            const issueDate = new Date().toLocaleDateString();
            doc.text(`Issued: ${issueDate}`, margin + 5, cardHeight - margin - 3);

            // Valid until
            const validDate = new Date();
            validDate.setFullYear(validDate.getFullYear() + 1);
            const validUntil = validDate.toLocaleDateString();
            doc.text(`Valid until: ${validUntil}`, cardWidth - margin - 5, cardHeight - margin - 3, { align: "right" });

            // Save the PDF
            const fileName = `teacher_id_card_${instructor.name?.replace(/\s+/g, '_').toLowerCase() || 'instructor'}.pdf`;
            doc.save(fileName);

            console.log("PDF generated successfully:", fileName);
        } catch (error) {
            console.error("Error generating PDF:", error);

            // More specific error messages
            if (error.message.includes("jsPDF")) {
                alert("PDF library not available. Please refresh the page and try again.");
            } else if (error.message.includes("save")) {
                alert("PDF generation failed. Please check your browser settings and try again.");
            } else {
                alert("Failed to generate PDF. Please try again. Error: " + error.message);
            }
        } finally {
            setIsGeneratingPDF(false);
        }
    };

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
                            <Button
                                onClick={generateIdCardPDF}
                                className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
                                disabled={isGeneratingPDF}
                            >
                                <Download className="h-4 w-4" />
                                {isGeneratingPDF ? "Generating..." : "Download ID Card"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* ID Card Preview Modal */}
            <Dialog open={showIdCard} onOpenChange={setShowIdCard}>
                <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Teacher ID Card
                        </DialogTitle>
                    </DialogHeader>

                    <div className="bg-gradient-to-br from-red-600 to-red-700 p-4 rounded-lg text-white">
                        {/* ID Card Design */}
                        <div className="bg-white text-gray-800 p-3 rounded-lg shadow-lg">
                            {/* Header */}
                            <div className="bg-red-600 text-white p-2 rounded-t-lg -mt-3 -mx-3 mb-3 text-center">
                                <h3 className="font-bold text-sm">NEXTBYTE EDUCATION</h3>
                                <p className="text-xs">TEACHER IDENTIFICATION CARD</p>
                            </div>

                            <div className="flex gap-3">
                                {/* Photo Area */}
                                <div className="w-16 h-20 bg-gray-100 border-2 border-red-600 rounded flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs text-gray-500">PHOTO</span>
                                </div>

                                {/* Information */}
                                <div className="flex-1 space-y-1 text-xs min-w-0">
                                    <div className="flex">
                                        <span className="font-semibold w-16 flex-shrink-0">Name:</span>
                                        <span className="truncate">{instructor.name}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="font-semibold w-16 flex-shrink-0">ID:</span>
                                        <span className="truncate">{instructor.id || 'N/A'}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="font-semibold w-16 flex-shrink-0">Designation:</span>
                                        <span className="truncate">{instructor.designation}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="font-semibold w-16 flex-shrink-0">Email:</span>
                                        <span className="truncate text-xs">{instructor.email}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="font-semibold w-16 flex-shrink-0">Experience:</span>
                                        <span>{instructor.experience} years</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="font-semibold w-16 flex-shrink-0">Role:</span>
                                        <span className="truncate">{instructor.role}</span>
                                        <Badge
                                            variant={instructor.isActive ? "default" : "secondary"}
                                            className="ml-auto text-xs px-1 py-0"
                                        >
                                            {instructor.isActive ? "ACTIVE" : "INACTIVE"}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="bg-red-600 text-white p-2 rounded-b-lg -mb-3 -mx-3 mt-3 text-xs flex justify-between">
                                <span>Issued: {new Date().toLocaleDateString()}</span>
                                <span>Valid until: {new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                        <Button
                            onClick={generateIdCardPDF}
                            className="flex-1 bg-red-600 hover:bg-red-700"
                            disabled={isGeneratingPDF}
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                        </Button>
                        <Button
                            onClick={() => setShowIdCard(false)}
                            variant="outline"
                        >
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default InstructorDetailsModal;
