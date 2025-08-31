import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
    Star,
    CheckCircle,
    XCircle,
    Clock,
    ExternalLink,
    Download
} from 'lucide-react';
import { formatDate } from '@/utils/userUtils';

const AssignmentSubmissionReviewModal = ({
    submission,
    isOpen,
    onClose,
    onSubmit,
    isLoading = false
}) => {
    const [reviewData, setReviewData] = useState({
        marks: submission?.marks || '',
        feedback: submission?.feedback || '',
        status: submission?.status || 'pending'
    });

    // Update form data when submission changes
    useEffect(() => {
        if (submission) {
            setReviewData({
                marks: submission.marks || '',
                feedback: submission.feedback || '',
                status: submission.status || 'pending'
            });
        }
    }, [submission]);

    const handleSubmit = () => {
        if (!reviewData.marks || !reviewData.feedback || !reviewData.status) {
            return;
        }

        onSubmit({
            id: submission.id,
            reviewData: {
                marks: parseInt(reviewData.marks),
                feedback: reviewData.feedback,
                status: reviewData.status
            }
        });
    };

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

    if (!submission) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Review Assignment Submission
                    </DialogTitle>
                    <DialogDescription>
                        Review and grade the submission for {submission.student?.name}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Submission Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                        <div>
                            <h4 className="font-semibold mb-2">Student Information</h4>
                            <div className="space-y-1 text-sm">
                                <p><span className="font-medium">Name:</span> {submission.student?.name}</p>
                                <p><span className="font-medium">Email:</span> {submission.student?.email}</p>
                                <p><span className="font-medium">Phone:</span> {submission.student?.phone}</p>
                                <p><span className="font-medium">Institute:</span> {submission.student?.instituteName}</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Assignment Details</h4>
                            <div className="space-y-1 text-sm">
                                <p><span className="font-medium">Title:</span> {submission.assignment?.title}</p>
                                <p><span className="font-medium">Total Marks:</span> {submission.assignment?.totalMarks}</p>
                                <p><span className="font-medium">Due Date:</span> {submission.assignment?.dueDate ? formatDate(submission.assignment.dueDate) : 'No due date'}</p>
                                <p><span className="font-medium">Submitted:</span> {formatDate(submission.createdAt)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Submission Content */}
                    <div className="space-y-4">
                        <div>
                            <Label className="text-base font-medium">Submission Description</Label>
                            <div className="mt-2 p-3 bg-muted/30 rounded-md">
                                <p className="text-sm">{submission.description || 'No description provided'}</p>
                            </div>
                        </div>

                        {/* Links */}
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

                    {/* Review Form */}
                    <div className="space-y-4 border-t pt-4">
                        <h4 className="font-semibold">Review & Grading</h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="marks">Marks</Label>
                                <Input
                                    id="marks"
                                    type="number"
                                    min="0"
                                    max={submission.assignment?.totalMarks || 100}
                                    value={reviewData.marks}
                                    onChange={(e) => setReviewData(prev => ({ ...prev, marks: e.target.value }))}
                                    placeholder="Enter marks"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Max marks: {submission.assignment?.totalMarks || 100}
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={reviewData.status}
                                    onValueChange={(value) => setReviewData(prev => ({ ...prev, status: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending Review</SelectItem>
                                        <SelectItem value="approved">Approved</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="mt-2">
                                    {getStatusBadge(reviewData.status)}
                                </div>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="feedback">Feedback</Label>
                            <Textarea
                                id="feedback"
                                value={reviewData.feedback}
                                onChange={(e) => setReviewData(prev => ({ ...prev, feedback: e.target.value }))}
                                placeholder="Provide detailed feedback for the student..."
                                rows={4}
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading || !reviewData.marks || !reviewData.feedback || !reviewData.status}
                    >
                        {isLoading ? 'Submitting...' : 'Submit Review'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AssignmentSubmissionReviewModal;
