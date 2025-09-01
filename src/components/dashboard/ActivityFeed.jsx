import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    GraduationCap,
    Clock,
    CreditCard
} from "lucide-react";

const ActivityFeed = ({ dashboardData }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {dashboardData?.recentActivity?.recentEnrollments?.slice(0, 4).map((enrollment, index) => {
                        const timeAgo = new Date(enrollment.createdAt || enrollment.date);
                        const now = new Date();
                        const diffInHours = Math.floor((now - timeAgo) / (1000 * 60 * 60));
                        const timeText = diffInHours < 1 ? "Just now" :
                            diffInHours < 24 ? `${diffInHours} hours ago` :
                                `${Math.floor(diffInHours / 24)} days ago`;

                        return (
                            <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800`}>
                                    {enrollment.status === "active" ? (
                                        <GraduationCap className="h-4 w-4 text-green-600" />
                                    ) : enrollment.status === "pending" ? (
                                        <Clock className="h-4 w-4 text-orange-600" />
                                    ) : (
                                        <CreditCard className="h-4 w-4 text-blue-600" />
                                    )}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        {enrollment.status === "active" ? "Enrollment completed" :
                                            enrollment.status === "pending" ? "New enrollment" : "Payment processed"}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {enrollment.student?.name || enrollment.studentName} enrolled in {enrollment.course?.name || enrollment.courseName}
                                    </p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">
                                        Amount: ${parseFloat(enrollment.amountPaid || enrollment.amount || 0).toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
                                    <Clock className="h-3 w-3" />
                                    <span>{timeText}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default ActivityFeed;
