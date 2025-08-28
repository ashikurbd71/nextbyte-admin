import React from "react";
import { BookOpen, Users, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CourseStatsCards = ({ stats, statsLoading }) => {
    const defaultStats = {
        totalCourses: 0,
        activeCourses: 0,
        totalEnrollments: 0,
        averageRating: 0,
    };

    const data = stats || defaultStats;

    const cards = [
        {
            title: "Total Courses",
            value: data.totalCourses,
            icon: BookOpen,
            description: "All courses created",
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            title: "Active Courses",
            value: data.activeCourses,
            icon: TrendingUp,
            description: "Published courses",
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
        {
            title: "Total Enrollments",
            value: data.totalEnrollments,
            icon: Users,
            description: "Student enrollments",
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
        {
            title: "Average Rating",
            value: data.averageRating?.toFixed(1) || "0.0",
            icon: Clock,
            description: "Course ratings",
            color: "text-orange-600",
            bgColor: "bg-orange-50",
        },
    ];

    if (statsLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <Card key={index} className="animate-pulse">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                <div className="h-4 bg-slate-200 rounded w-24"></div>
                            </CardTitle>
                            <div className="h-8 w-8 bg-slate-200 rounded"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-8 bg-slate-200 rounded w-16 mb-2"></div>
                            <div className="h-3 bg-slate-200 rounded w-32"></div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            {card.title}
                        </CardTitle>
                        <div className={`p-2 rounded-lg ${card.bgColor}`}>
                            <card.icon className={`h-4 w-4 ${card.color}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">
                            {card.value}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                            {card.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default CourseStatsCards;
