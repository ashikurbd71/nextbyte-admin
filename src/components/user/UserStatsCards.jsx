import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, CheckCircle, Ban, Loader2 } from "lucide-react";

const UserStatsCards = ({ stats, statsLoading }) => {
    const statCards = [
        {
            title: "Total Users",
            value: stats?.total || 0,
            icon: Users,
            bgColor: "bg-blue-100 dark:bg-blue-900/20",
            iconColor: "text-blue-600"
        },
        {
            title: "Active Users",
            value: stats?.active || 0,
            icon: Users,
            bgColor: "bg-green-100 dark:bg-green-900/20",
            iconColor: "text-green-600"
        },
        {
            title: "Verified Users",
            value: stats?.verified || 0,
            icon: CheckCircle,
            bgColor: "bg-purple-100 dark:bg-purple-900/20",
            iconColor: "text-purple-600"
        },
        {
            title: "Banned Users",
            value: stats?.banned || 0,
            icon: Ban,
            bgColor: "bg-red-100 dark:bg-red-900/20",
            iconColor: "text-red-600"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {statCards.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                    <Card key={index}>
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                                <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                                    <IconComponent className={`h-6 w-6 ${stat.iconColor}`} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                        {stat.title}
                                    </p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {statsLoading ? (
                                            <Loader2 className="h-6 w-6 animate-spin" />
                                        ) : (
                                            stat.value
                                        )}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

export default UserStatsCards;
