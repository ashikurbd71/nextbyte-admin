import { Card, CardContent } from "@/components/ui/card";
import { Users, CheckCircle, Clock, DollarSign } from "lucide-react";

const EnrollmentStats = ({ stats, formatCurrency }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-600">Total Enrollments</p>
                            <p className="text-2xl font-bold">{stats?.totalEnrollments || 0}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-600">Active Enrollments</p>
                            <p className="text-2xl font-bold">{stats?.activeEnrollments || 0}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                            <Clock className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-600">Pending Enrollments</p>
                            <p className="text-2xl font-bold">{stats?.pendingEnrollments || 0}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                            <DollarSign className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                            <p className="text-2xl font-bold">{formatCurrency(stats?.totalRevenue || 0)}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default EnrollmentStats;
