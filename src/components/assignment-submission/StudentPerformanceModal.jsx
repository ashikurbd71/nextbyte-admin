import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    TrendingUp,
    FileText,
    CheckCircle,
    XCircle,
    Clock,
    Star,
    Users,
    Award
} from 'lucide-react';
import { formatDate } from '@/utils/userUtils';
import Loader from '@/components/loader/Loader';

const StudentPerformanceModal = ({
    studentId,
    performance,
    isOpen,
    onClose,
    isLoading = false
}) => {
    if (isLoading) {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Student Performance</DialogTitle>
                        <DialogDescription>Loading performance data...</DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-center py-8">
                        <Loader />
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    if (!performance) {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Student Performance</DialogTitle>
                        <DialogDescription>No performance data available</DialogDescription>
                    </DialogHeader>
                    <div className="text-center py-8 text-muted-foreground">
                        No performance data found for this student.
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { variant: 'secondary', icon: Clock, text: 'Pending' },
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

    const getGradeColor = (percentage) => {
        if (percentage >= 90) return 'text-green-600';
        if (percentage >= 80) return 'text-blue-600';
        if (percentage >= 70) return 'text-yellow-600';
        if (percentage >= 60) return 'text-orange-600';
        return 'text-red-600';
    };

    const getGradeLetter = (percentage) => {
        if (percentage >= 90) return 'A+';
        if (percentage >= 80) return 'A';
        if (percentage >= 70) return 'B';
        if (percentage >= 60) return 'C';
        if (percentage >= 50) return 'D';
        return 'F';
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Student Performance Overview
                    </DialogTitle>
                    <DialogDescription>
                        Detailed performance analysis and submission history
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Performance Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{performance.totalSubmissions}</div>
                                <p className="text-xs text-muted-foreground">
                                    All time submissions
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Average Marks</CardTitle>
                                <Star className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{performance.averageMarks?.toFixed(1)}%</div>
                                <p className="text-xs text-muted-foreground">
                                    Overall performance
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Marks</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{performance.totalMarks}</div>
                                <p className="text-xs text-muted-foreground">
                                    Cumulative score
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Grade</CardTitle>
                                <Award className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className={`text-2xl font-bold ${getGradeColor(performance.averageMarks)}`}>
                                    {getGradeLetter(performance.averageMarks)}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Current grade
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Status Distribution */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Submission Status Distribution
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {Object.entries(performance.statusCounts || {}).map(([status, count]) => (
                                    <div key={status} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            {getStatusBadge(status)}
                                        </div>
                                        <div className="text-lg font-semibold">{count}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Performance Progress */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span>Overall Performance</span>
                                        <span>{performance.averageMarks?.toFixed(1)}%</span>
                                    </div>
                                    <Progress value={performance.averageMarks} className="h-2" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium">Performance Level: </span>
                                        <span className={getGradeColor(performance.averageMarks)}>
                                            {performance.averageMarks >= 90 ? 'Excellent' :
                                                performance.averageMarks >= 80 ? 'Very Good' :
                                                    performance.averageMarks >= 70 ? 'Good' :
                                                        performance.averageMarks >= 60 ? 'Satisfactory' : 'Needs Improvement'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Submission Rate: </span>
                                        <span>{performance.totalSubmissions} assignments completed</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submission History */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Submissions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {performance.submissions?.map((submission) => (
                                    <div key={submission.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                        <div className="flex-1">
                                            <div className="font-medium">
                                                {submission.assignmentTitle || 'Unknown Assignment'}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Submitted: {formatDate(submission.submittedAt)}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {submission.marks !== null && (
                                                <div className="text-right">
                                                    <div className="font-semibold">{submission.marks} marks</div>
                                                </div>
                                            )}
                                            {getStatusBadge(submission.status)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-end">
                    <Button onClick={onClose}>
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default StudentPerformanceModal;
