import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Eye,
    Trash2,
    CheckCircle,
    XCircle,
    Clock,
    Star,
    ExternalLink,
    Download
} from 'lucide-react';
import { formatDate } from '@/utils/userUtils';
import Loader from '@/components/loader/Loader';
import NoDataFound from '@/components/no-data/nodata';

const AssignmentSubmissionTable = ({
    submissions,
    onView,
    onDelete,
    onReview,
    onViewPerformance,
    isLoading
}) => {
    const [expandedRows, setExpandedRows] = useState(new Set());

    const toggleRowExpansion = (id) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedRows(newExpanded);
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

    if (isLoading) {
        return <Loader />;
    }

    if (!submissions || submissions.length === 0) {
        return <NoDataFound>No assignment submissions found</NoDataFound>;
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Assignment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Marks</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Reviewed</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {submissions.map((submission) => (
                        <React.Fragment key={submission.id}>
                            <TableRow
                                className="cursor-pointer hover:bg-muted/50"
                                onClick={() => toggleRowExpansion(submission.id)}
                            >
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                            {submission.student?.photoUrl ? (
                                                <img
                                                    src={submission.student.photoUrl}
                                                    alt={submission.student.name}
                                                    className="h-10 w-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-sm font-medium">
                                                    {submission.student?.name?.charAt(0) || 'S'}
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-medium">
                                                {submission.student?.name || 'Unknown Student'}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {submission.student?.email || 'No email'}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <div className="font-medium">
                                            {submission.assignment?.title || 'Unknown Assignment'}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {submission.assignment?.description?.substring(0, 50)}...
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {getStatusBadge(submission.status)}
                                </TableCell>
                                <TableCell>
                                    {getMarksDisplay(submission.marks, submission.assignment?.totalMarks)}
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm">
                                        {formatDate(submission.createdAt)}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm">
                                        {submission.reviewedAt ? formatDate(submission.reviewedAt) : 'Not reviewed'}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onView(submission);
                                            }}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onReview(submission);
                                            }}
                                        >
                                            <Star className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onViewPerformance(submission.studentId);
                                            }}
                                        >
                                            <CheckCircle className="h-4 w-4" />
                                        </Button>



                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDelete(submission);
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>

                            {/* Expanded Row Details */}
                            {expandedRows.has(submission.id) && (
                                <TableRow>
                                    <TableCell colSpan={7} className="bg-muted/30">
                                        <div className="p-4 space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <h4 className="font-semibold mb-2">Submission Details</h4>
                                                    <div className="space-y-2 text-sm">
                                                        <div>
                                                            <span className="font-medium">Description:</span>
                                                            <p className="text-muted-foreground mt-1">
                                                                {submission.description || 'No description provided'}
                                                            </p>
                                                        </div>

                                                        {submission.githubLink && (
                                                            <div>
                                                                <span className="font-medium">GitHub Link:</span>
                                                                <div className="mt-1">
                                                                    <a
                                                                        href={submission.githubLink}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-blue-600 hover:underline flex items-center gap-1"
                                                                    >
                                                                        <ExternalLink className="h-3 w-3" />
                                                                        View Repository
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {submission.liveLink && (
                                                            <div>
                                                                <span className="font-medium">Live Link:</span>
                                                                <div className="mt-1">
                                                                    <a
                                                                        href={submission.liveLink}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-blue-600 hover:underline flex items-center gap-1"
                                                                    >
                                                                        <ExternalLink className="h-3 w-3" />
                                                                        View Live Demo
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {submission.fileUrl && (
                                                            <div>
                                                                <span className="font-medium">File:</span>
                                                                <div className="mt-1">
                                                                    <a
                                                                        href={submission.fileUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-blue-600 hover:underline flex items-center gap-1"
                                                                    >
                                                                        <Download className="h-3 w-3" />
                                                                        Download File
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold mb-2">Review Information</h4>
                                                    <div className="space-y-2 text-sm">
                                                        <div>
                                                            <span className="font-medium">Assignment Details:</span>
                                                            <div className="text-muted-foreground mt-1">
                                                                <p>Total Marks: {submission.assignment?.totalMarks || 'N/A'}</p>
                                                                <p>Due Date: {submission.assignment?.dueDate ? formatDate(submission.assignment.dueDate) : 'No due date'}</p>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <span className="font-medium">Student Information:</span>
                                                            <div className="text-muted-foreground mt-1">
                                                                <p>Phone: {submission.student?.phone || 'N/A'}</p>
                                                                <p>Institute: {submission.student?.instituteName || 'N/A'}</p>
                                                                <p>Semester: {submission.student?.semester || 'N/A'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AssignmentSubmissionTable;
