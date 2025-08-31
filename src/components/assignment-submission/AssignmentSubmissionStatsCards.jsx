import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    FileText,
    Clock,
    CheckCircle,
    XCircle,
    TrendingUp,
    Users,
    Star
} from 'lucide-react';
import Loader from '@/components/loader/Loader';

const AssignmentSubmissionStatsCards = ({ statistics, isLoading }) => {
    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                <div className="h-4 bg-muted rounded animate-pulse" />
                            </CardTitle>
                            <div className="h-4 w-4 bg-muted rounded animate-pulse" />
                        </CardHeader>
                        <CardContent>
                            <div className="h-8 bg-muted rounded animate-pulse" />
                            <div className="h-3 bg-muted rounded animate-pulse mt-2" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (!statistics) {
        return null;
    }

    const stats = [
        {
            title: "Total Submissions",
            value: statistics.totalSubmissions || 0,
            icon: FileText,
            description: "All time submissions",
            color: "text-blue-600"
        },
        {
            title: "Pending Review",
            value: statistics.statusCounts?.pending || 0,
            icon: Clock,
            description: "Awaiting review",
            color: "text-yellow-600"
        },
        {
            title: "Approved",
            value: statistics.statusCounts?.approved || 0,
            icon: CheckCircle,
            description: "Successfully approved",
            color: "text-green-600"
        },
        {
            title: "Rejected",
            value: statistics.statusCounts?.rejected || 0,
            icon: XCircle,
            description: "Rejected submissions",
            color: "text-red-600"
        },
        {
            title: "Average Marks",
            value: statistics.averageMarks ? `${statistics.averageMarks.toFixed(1)}%` : 'N/A',
            icon: Star,
            description: "Overall performance",
            color: "text-purple-600"
        },
        {
            title: "Active Students",
            value: statistics.activeStudents || 0,
            icon: Users,
            description: "Students with submissions",
            color: "text-indigo-600"
        }
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <Icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

export default AssignmentSubmissionStatsCards;
