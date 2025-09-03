import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  BookOpen,
  GraduationCap,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

// Helper function to safely render values
const safeRender = (value, fallback = 0) => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'object') return fallback;
  return value;
};

const AdditionalStatsCards = ({ dashboardData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Total Users
          </CardTitle>
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
            <Users className="h-4 w-4 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {safeRender(dashboardData?.users?.total)?.toLocaleString() || 0}
          </div>
          <div className="flex items-center space-x-1 text-xs">
            <ArrowUpRight className="h-3 w-3 text-green-600" />
            <span className="text-green-600">+180.1%</span>
            <span className="text-slate-500 dark:text-slate-400">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Total Courses
          </CardTitle>
          <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
            <BookOpen className="h-4 w-4 text-purple-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {safeRender(dashboardData?.courses?.total)?.toLocaleString() || 0}
          </div>
          <div className="flex items-center space-x-1 text-xs">
            <ArrowUpRight className="h-3 w-3 text-green-600" />
            <span className="text-green-600">+19%</span>
            <span className="text-slate-500 dark:text-slate-400">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Pending Enrollments
          </CardTitle>
          <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20">
            <GraduationCap className="h-4 w-4 text-orange-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {safeRender(dashboardData?.enrollments?.totalPending)?.toLocaleString() || 0}
          </div>
          <div className="flex items-center space-x-1 text-xs">
            <ArrowDownRight className="h-3 w-3 text-red-600" />
            <span className="text-red-600">-2.1%</span>
            <span className="text-slate-500 dark:text-slate-400">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Active Enrollments
          </CardTitle>
          <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
            <GraduationCap className="h-4 w-4 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {safeRender(dashboardData?.enrollments?.statusStats?.active)}
          </div>
          <div className="flex items-center space-x-1 text-xs">
            <ArrowUpRight className="h-3 w-3 text-green-600" />
            <span className="text-green-600">+12.5%</span>
            <span className="text-slate-500 dark:text-slate-400">from last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdditionalStatsCards;
