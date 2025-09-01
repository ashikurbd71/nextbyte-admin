import { Card, CardContent } from "@/components/ui/card";
import {
    MessageSquare,
    Clock,
    Users,
    CheckCircle,
} from "lucide-react";

const SupportTicketsStatsCards = ({ stats, isLoading }) => {
    const statsCards = [
        {
            title: "Total Tickets",
            value: stats?.total || 0,
            icon: MessageSquare,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            title: "Open Tickets",
            value: stats?.open || 0,
            icon: Clock,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
        },
        {
            title: "Assigned Tickets",
            value: stats?.assigned || 0,
            icon: Users,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
        {
            title: "Closed Tickets",
            value: stats?.closed || 0,
            icon: CheckCircle,
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
    ];

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                    <Card key={index}>
                        <CardContent className="p-6">
                            <div className="animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <Card key={index}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                                    <Icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

export default SupportTicketsStatsCards;
