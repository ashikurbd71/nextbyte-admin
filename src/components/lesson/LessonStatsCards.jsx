import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Play, FileText, Eye, Clock, Users, TrendingUp, Video } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const LessonStatsCards = ({ stats, isLoading }) => {
    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Card key={index} className="shadow-sm border-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-8 rounded-lg" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-16 mb-2" />
                            <Skeleton className="h-3 w-32" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    const statCards = [
        {
            title: "Total Lessons",
            value: stats?.totalLessons || 0,
            description: "All lessons created",
            icon: BookOpen,
            color: "text-blue-600 dark:text-blue-400",
            bgColor: "bg-blue-100 dark:bg-blue-900/30",
            borderColor: "border-blue-200 dark:border-blue-800",
        },
        {
            title: "Active Lessons",
            value: stats?.activeLessons || 0,
            description: "Currently active",
            icon: Play,
            color: "text-green-600 dark:text-green-400",
            bgColor: "bg-green-100 dark:bg-green-900/30",
            borderColor: "border-green-200 dark:border-green-800",
        },
        {
            title: "Preview Lessons",
            value: stats?.previewLessons || 0,
            description: "Available for preview",
            icon: Eye,
            color: "text-purple-600 dark:text-purple-400",
            bgColor: "bg-purple-100 dark:bg-purple-900/30",
            borderColor: "border-purple-200 dark:border-purple-800",
        },
        {
            title: "Video Lessons",
            value: stats?.videoLessons || 0,
            description: "With video content",
            icon: Video,
            color: "text-red-600 dark:text-red-400",
            bgColor: "bg-red-100 dark:bg-red-900/30",
            borderColor: "border-red-200 dark:border-red-800",
        },
        {
            title: "File Lessons",
            value: stats?.fileLessons || 0,
            description: "With file attachments",
            icon: FileText,
            color: "text-orange-600 dark:text-orange-400",
            bgColor: "bg-orange-100 dark:bg-orange-900/30",
            borderColor: "border-orange-200 dark:border-orange-800",
        },
        {
            title: "Text Lessons",
            value: stats?.textLessons || 0,
            description: "Text-based content",
            icon: FileText,
            color: "text-indigo-600 dark:text-indigo-400",
            bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
            borderColor: "border-indigo-200 dark:border-indigo-800",
        },
        {
            title: "Average Duration",
            value: stats?.averageDuration || "0 min",
            description: "Per lesson",
            icon: Clock,
            color: "text-cyan-600 dark:text-cyan-400",
            bgColor: "bg-cyan-100 dark:bg-cyan-900/30",
            borderColor: "border-cyan-200 dark:border-cyan-800",
        },
        {
            title: "Total Views",
            value: stats?.totalViews || 0,
            description: "Lesson views",
            icon: TrendingUp,
            color: "text-emerald-600 dark:text-emerald-400",
            bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
            borderColor: "border-emerald-200 dark:border-emerald-800",
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                    <Card key={index} className={`shadow-sm border-0 hover:shadow-md transition-shadow duration-200 ${card.borderColor}`}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {card.title}
                            </CardTitle>
                            <div className={`p-2.5 rounded-lg ${card.bgColor} border ${card.borderColor}`}>
                                <IconComponent className={`h-4 w-4 ${card.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                                {typeof card.value === 'number' && card.value >= 1000
                                    ? (card.value / 1000).toFixed(1) + 'k'
                                    : card.value}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                {card.description}
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

export default LessonStatsCards;
