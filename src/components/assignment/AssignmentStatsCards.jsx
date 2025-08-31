import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Award, Clock, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";

const AssignmentStatsCards = ({ statistics, isLoading = false }) => {
    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                <div className="h-4 bg-muted rounded animate-pulse"></div>
                            </CardTitle>
                            <div className="h-4 w-4 bg-muted rounded animate-pulse"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-8 bg-muted rounded animate-pulse"></div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    const stats = statistics || {
        totalAssignments: 0,
        activeAssignments: 0,
        totalMarks: 0,
        overdueAssignments: 0,
        dueToday: 0,
        dueThisWeek: 0,
        averageMarks: 0,
        completionRate: "0%",
        totalSubmissions: 0,
        completedSubmissions: 0
    };

    const cards = [
        {
            title: "Total Assignments",
            value: stats.totalAssignments,
            icon: BookOpen,
            description: "All assignments",
            color: "text-blue-600",
            bgColor: "bg-blue-100"
        },
        {
            title: "Active Assignments",
            value: stats.activeAssignments,
            icon: CheckCircle,
            description: "Currently active",
            color: "text-green-600",
            bgColor: "bg-green-100"
        },
        {
            title: "Total Marks",
            value: stats.totalMarks,
            icon: Award,
            description: "Combined marks",
            color: "text-purple-600",
            bgColor: "bg-purple-100"
        },
        {
            title: "Average Marks",
            value: stats.averageMarks,
            icon: Award,
            description: "Per assignment",
            color: "text-indigo-600",
            bgColor: "bg-indigo-100"
        },
        {
            title: "Total Submissions",
            value: stats.totalSubmissions,
            icon: TrendingUp,
            description: "All submissions",
            color: "text-cyan-600",
            bgColor: "bg-cyan-100"
        },
        {
            title: "Completed Submissions",
            value: stats.completedSubmissions,
            icon: CheckCircle,
            description: "Finished submissions",
            color: "text-emerald-600",
            bgColor: "bg-emerald-100"
        },
        {
            title: "Completion Rate",
            value: stats.completionRate,
            icon: CheckCircle,
            description: "Completion percentage",
            color: "text-teal-600",
            bgColor: "bg-teal-100"
        },
        {
            title: "Overdue",
            value: stats.overdueAssignments,
            icon: AlertCircle,
            description: "Past due date",
            color: "text-red-600",
            bgColor: "bg-red-100"
        },
        {
            title: "Due Today",
            value: stats.dueToday,
            icon: Clock,
            description: "Due today",
            color: "text-orange-600",
            bgColor: "bg-orange-100"
        },
        {
            title: "Due This Week",
            value: stats.dueThisWeek,
            icon: TrendingUp,
            description: "Due in 7 days",
            color: "text-yellow-600",
            bgColor: "bg-yellow-100"
        }
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-6">
            {cards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {card.title}
                            </CardTitle>
                            <div className={`p-2 rounded-full ${card.bgColor}`}>
                                <IconComponent className={`h-4 w-4 ${card.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{card.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {card.description}
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

export default AssignmentStatsCards;
