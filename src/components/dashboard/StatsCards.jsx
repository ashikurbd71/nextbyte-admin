import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const StatsCards = ({ dashboardData }) => {
  const stats = [
    {
      title: "Total Revenue (Year)",
      value: `$${dashboardData?.earnings?.totalYear?.toLocaleString() || 0}`,
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20"
    },
    {
      title: "Monthly Revenue",
      value: `$${dashboardData?.earnings?.totalMonth?.toLocaleString() || 0}`,
      change: "+15.3%",
      trend: "up",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      title: "Weekly Revenue",
      value: `$${dashboardData?.earnings?.totalWeek?.toLocaleString() || 0}`,
      change: "+8.7%",
      trend: "up",
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20"
    },
    {
      title: "Today's Revenue",
      value: `$${dashboardData?.earnings?.totalToday?.toLocaleString() || 0}`,
      change: "+2.1%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {stat.value}
            </div>
            <div className="flex items-center space-x-1 text-xs">
              {stat.trend === "up" ? (
                <ArrowUpRight className="h-3 w-3 text-green-600" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-600" />
              )}
              <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                {stat.change}
              </span>
              <span className="text-slate-500 dark:text-slate-400">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
