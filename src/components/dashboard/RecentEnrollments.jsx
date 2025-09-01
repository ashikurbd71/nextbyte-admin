import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RecentEnrollments = ({ dashboardData }) => {
    const recentOrders = dashboardData?.recentActivity?.recentEnrollments?.slice(0, 4).map(enrollment => ({
        id: `#${enrollment.id}`,
        customer: enrollment.student?.name || enrollment.studentName || "Unknown",
        email: enrollment.student?.email || enrollment.studentEmail || "No email",
        amount: `$${parseFloat(enrollment.amountPaid || enrollment.amount || 0).toLocaleString()}`,
        status: enrollment.status === "active" ? "Completed" :
            enrollment.status === "pending" ? "Pending" :
                enrollment.status === "cancelled" ? "Cancelled" : "Processing",
        date: new Date(enrollment.createdAt || enrollment.date).toLocaleDateString(),
        courseName: enrollment.course?.name || enrollment.courseName || "Unknown Course"
    })) || [];

    const getStatusColor = (status) => {
        switch (status) {
            case "Completed":
                return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
            case "Processing":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
            case "Pending":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
        }
    };

    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Recent Enrollments</CardTitle>
                    <Button variant="outline" size="sm">
                        View All
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentOrders.map((order, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center space-x-2">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        {order.customer}
                                    </p>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        {order.id}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {order.email}
                                </p>
                                <p className="text-xs text-slate-400 dark:text-slate-500">
                                    Course: {order.courseName}
                                </p>
                            </div>
                            <div className="flex flex-col items-end space-y-1">
                                <span className="text-sm font-medium text-slate-900 dark:text-white">
                                    {order.amount}
                                </span>
                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                    {order.date}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default RecentEnrollments;
