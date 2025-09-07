import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, CreditCard } from "lucide-react";

const InstructorIdCard = ({ instructor, isOpen, onClose }) => {
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    if (!instructor) return null;

    const generateIdCardPDF = async () => {
        try {
            setIsGeneratingPDF(true);

            // Import required libraries
            const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
                import('html2canvas'),
                import('jspdf')
            ]);

            // Get the ID card element
            const cardElement = document.querySelector('.id-card-container');
            if (!cardElement) {
                throw new Error("ID card element not found");
            }

            // Capture the component as canvas
            const canvas = await html2canvas(cardElement, {
                scale: 2, // Higher quality
                useCORS: true, // Handle cross-origin images
                allowTaint: true,
                backgroundColor: '#ffffff',
                logging: false
            });

            // Create PDF
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: [85, 120] // ID card size
            });

            // Calculate dimensions to fit the card
            const imgWidth = 85;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Add image to PDF
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

            // Save the PDF
            const fileName = `teacher_id_card_${instructor.name?.replace(/\s+/g, '_').toLowerCase() || 'instructor'}.pdf`;
            pdf.save(fileName);

            console.log("PDF generated successfully:", fileName);
        } catch (error) {
            console.error("Error generating PDF:", error);

            // More specific error messages
            if (error.message.includes("html2canvas")) {
                alert("Component capture failed. Please refresh the page and try again.");
            } else if (error.message.includes("jsPDF")) {
                alert("PDF library not available. Please refresh the page and try again.");
            } else {
                alert("Failed to generate PDF. Please try again. Error: " + error.message);
            }
        } finally {
            setIsGeneratingPDF(false); // Always reset the state
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Teacher ID Card
                    </DialogTitle>
                </DialogHeader>

                <div className="p-4">
                    {/* Clean Modern ID Card Design */}
                    <div className="relative w-[300px] h-[450px] bg-white rounded-lg shadow-2xl overflow-hidden id-card-container">
                        {/* Wave-like Header */}
                        <div className="relative h-20 bg-primary overflow-hidden">
                            {/* Wave curve effect */}
                            <div className="absolute bottom-0 left-0 w-full h-8 bg-primary">
                                <svg className="absolute bottom-0 w-full h-8" viewBox="0 0 320 32" preserveAspectRatio="none">
                                    <path d="M0,32 Q80,0 160,16 T320,8 L320,32 Z" fill="white" />
                                </svg>
                            </div>
                        </div>

                        {/* Circular Photo - Overlapping header and main */}
                        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-10">
                            <div className="w-24 h-24 bg-white border-4 border-white rounded-full shadow-lg flex items-center justify-center">
                                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                                    {instructor.photoUrl ? (
                                        <img
                                            src={instructor.photoUrl}
                                            alt={instructor.name}
                                            className="w-full h-full object-cover rounded-full"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                    ) : null}
                                    <span className="text-xs text-muted-foreground font-semibold" style={{ display: instructor.photoUrl ? 'none' : 'flex' }}>
                                        PHOTO
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="pt-24 px-6 pb-4">
                            {/* Name Section */}
                            <div className="text-center mb-4">
                                <div className="text-2xl font-bold">
                                    <span className="text-secondary">{instructor.name?.split(' ')[0] || 'NAME'}</span>
                                    <span className="text-primary ml-2">{instructor.name?.split(' ')[1] || 'SURNAME'}</span>
                                </div>
                                <div className="text-sm text-secondary mt-1">
                                    {instructor.designation || 'Your Position Here'}
                                </div>
                            </div>

                            {/* Personal Details */}
                            <div className="space-y-2 pt-8 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-secondary font-medium">ID No:</span>
                                    <span className="text-secondary">{instructor.id || '###'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-secondary font-medium">Mail:</span>
                                    <span className="text-secondary text-xs">{instructor.email || 'your mail here'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-secondary font-medium">Phone:</span>
                                    <span className="text-secondary">{instructor.phone || '### ### ###'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Footer */}
                        <div className="absolute bottom-0 left-0 w-full h-8 bg-secondary"></div>
                    </div>
                </div>

                <div className="flex gap-2 mt-4">
                    <Button
                        onClick={generateIdCardPDF}
                        className="flex-1 bg-primary hover:bg-primary/90"
                        disabled={isGeneratingPDF}
                    >
                        <Download className="h-4 w-4 mr-2" />
                        {isGeneratingPDF ? "Generating..." : "Download PDF"}
                    </Button>
                    <Button
                        onClick={onClose}
                        variant="outline"
                    >
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default InstructorIdCard;
