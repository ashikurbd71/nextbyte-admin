import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Eye,
    Star,
    CheckCircle,
    XCircle,
    Clock,
    ExternalLink,
    Download,
    Calendar,
    User,
    FileText,
    Award
} from 'lucide-react';
import { formatDate } from '@/utils/userUtils';

const AssignmentSubmissionDetailsModal = ({
    submission,
    isOpen,
    onClose,
    onReview
}) => {
    if (!submission) return null;

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { variant: 'secondary', icon: Clock, text: 'Pending Review' },
            approved: { variant: 'default', icon: CheckCircle, text: 'Approved' },
            rejected: { variant: 'destructive', icon: XCircle, text: 'Rejected' }
        };

        const config = statusConfig[status] || statusConfig.pending;
        const Icon = config.icon;

        return (
            <Badge variant={config.variant} className="flex items-center gap-1">
                <Icon className="h-3 w-3" />
                {config.text}
            </Badge>
        );
    };

    const getMarksDisplay = (marks, totalMarks) => {
        if (marks === null || marks === undefined) {
            return <span className="text-muted-foreground">Not graded</span>;
        }

        const percentage = totalMarks ? (marks / totalMarks) * 100 : 0;
        let colorClass = 'text-green-600';

        if (percentage < 60) colorClass = 'text-red-600';
        else if (percentage < 80) colorClass = 'text-yellow-600';

        return (
            <div className="flex items-center gap-2">
                <span className={`font-semibold ${colorClass}`}>
                    {marks}/{totalMarks || 'N/A'}
                </span>
                {totalMarks && (
                    <span className="text-sm text-muted-foreground">
                        ({percentage.toFixed(1)}%)
                    </span>
                )}
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Assignment Submission Details
                    </DialogTitle>
                    <DialogDescription>
                        Comprehensive view of submission information and review details
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Header Information */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                                {submission.student?.photoUrl ? (
                                    <img
                                        src={submission.student.photoUrl}
                                        alt={submission.student.name}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <User className="h-6 w-6 text-muted-foreground" />
                                )}
                            </div>
                            <div>
                                <h3 className="font-semibold">{submission.student?.name || 'Unknown Student'}</h3>
                                <p className="text-sm text-muted-foreground">{submission.student?.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {getStatusBadge(submission.status)}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onReview(submission)}
                                className="flex items-center gap-1"
                            >
                                <Star className="h-4 w-4" />
                                Review
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    {/* Assignment Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h4 className="font-semibold flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Assignment Details
                            </h4>
                            <div className="space-y-3">
                                <div>
                                    <Label className="text-sm font-medium">Title</Label>
                                    <p className="text-sm">{submission.assignment?.title || 'Unknown Assignment'}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium">Description</Label>
                                    <p className="text-sm">{submission.assignment?.description || 'No description'}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium">Total Marks</Label>
                                    <p className="text-sm">{submission.assignment?.totalMarks || 'N/A'}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium">Due Date</Label>
                                    <p className="text-sm">
                                        {submission.assignment?.dueDate ? formatDate(submission.assignment.dueDate) : 'No due date'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-semibold flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Student Information
                            </h4>
                            <div className="space-y-3">
                                <div>
                                    <Label className="text-sm font-medium">Name</Label>
                                    <p className="text-sm">{submission.student?.name || 'Unknown'}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium">Email</Label>
                                    <p className="text-sm">{submission.student?.email || 'N/A'}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium">Phone</Label>
                                    <p className="text-sm">{submission.student?.phone || 'N/A'}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium">Institute</Label>
                                    <p className="text-sm">{submission.student?.instituteName || 'N/A'}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium">Semester</Label>
                                    <p className="text-sm">{submission.student?.semester || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Submission Content */}
                    <div className="space-y-4">
                        <h4 className="font-semibold">Submission Content</h4>

                        <div>
                            <Label className="text-sm font-medium">Description</Label>
                            <div className="mt-2 p-3 bg-muted/30 rounded-md">
                                <p className="text-sm">{submission.description || 'No description provided'}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {submission.githubLink && (
                                <div>
                                    <Label className="text-sm font-medium">GitHub Repository</Label>
                                    <div className="mt-1">
                                        <a
                                            href={submission.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
                                        >
                                            <ExternalLink className="h-3 w-3" />
                                            View Repository
                                        </a>
                                    </div>
                                </div>
                            )}

                            {submission.liveLink && (
                                <div>
                                    <Label className="text-sm font-medium">Live Demo</Label>
                                    <div className="mt-1">
                                        <a
                                            href={submission.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
                                        >
                                            <ExternalLink className="h-3 w-3" />
                                            View Live Demo
                                        </a>
                                    </div>
                                </div>
                            )}

                            {submission.fileUrl && (
                                <div>
                                    <Label className="text-sm font-medium">Submitted File</Label>
                                    <div className="mt-1">
                                        <a
                                            href={submission.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
                                        >
                                            <Download className="h-3 w-3" />
                                            Download File
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <Separator />

                    {/* Review Information */}
                    <div className="space-y-4">
                        <h4 className="font-semibold flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            Review Information
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label className="text-sm font-medium">Marks</Label>
                                <div className="mt-1">
                                    {getMarksDisplay(submission.marks, submission.assignment?.totalMarks)}
                                </div>
                            </div>

                            <div>
                                <Label className="text-sm font-medium">Reviewed At</Label>
                                <p className="text-sm">
                                    {submission.reviewedAt ? formatDate(submission.reviewedAt) : 'Not reviewed yet'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Timestamps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <Label className="text-sm font-medium">Submitted</Label>
                            <p className="text-sm">{formatDate(submission.createdAt)}</p>
                        </div>
                        <div>
                            <Label className="text-sm font-medium">Last Updated</Label>
                            <p className="text-sm">{formatDate(submission.updatedAt)}</p>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// Helper component for labels
const Label = ({ children, className = "" }) => (
    <div className={`text-sm font-medium text-muted-foreground ${className}`}>
        {children}
    </div>
);

export default AssignmentSubmissionDetailsModal;
