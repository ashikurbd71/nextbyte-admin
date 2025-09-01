import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2 } from "lucide-react";
import {
    getEnrollmentStatusDisplay,
    getPaymentStatusDisplay,
    getEnrollmentStatusColor,
    getPaymentStatusColor
} from "@/lib/enums";

const EnrollmentCard = ({
    enrollment,
    formatDate,
    formatCurrency,
    onView,
    onDelete,
    isDeleting
}) => {
    return (
        <div className="border rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {enrollment.student?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h4 className="font-medium">{enrollment.student?.name}</h4>
                        <p className="text-sm text-slate-600">{enrollment.student?.email}</p>
                        <p className="text-sm text-slate-500">{enrollment.course?.name}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <p className="font-medium">{formatCurrency(enrollment.amountPaid)}</p>
                        <p className="text-sm text-slate-600">{formatDate(enrollment.createdAt)}</p>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                        <Badge className={getEnrollmentStatusColor ? getEnrollmentStatusColor(enrollment.status) : 'bg-gray-100 text-gray-800'}>
                            {getEnrollmentStatusDisplay ? getEnrollmentStatusDisplay(enrollment.status) : enrollment.status}
                        </Badge>
                        <Badge className={getPaymentStatusColor ? getPaymentStatusColor(enrollment.paymentStatus) : 'bg-gray-100 text-gray-800'}>
                            {getPaymentStatusDisplay ? getPaymentStatusDisplay(enrollment.paymentStatus) : enrollment.paymentStatus}
                        </Badge>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onView(enrollment.id)}
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(enrollment.id)}
                            disabled={isDeleting}
                            className="text-red-600 hover:text-red-700"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mt-3 pt-3 border-t">
                <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Transaction ID: {enrollment.transactionId}</span>
                    <span>Payment Method: {enrollment.paymentMethod}</span>
                </div>
            </div>
        </div>
    );
};

export default EnrollmentCard;
