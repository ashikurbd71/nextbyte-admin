import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Mail, Search } from "lucide-react";

const EnrollmentActionsBar = ({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    onExport,
    onSendMail,
    filteredEnrollmentsCount,
    hasEnrollments
}) => {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search students..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full sm:w-40">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Enrollments</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button
                            variant="outline"
                            onClick={onExport}
                            disabled={!hasEnrollments}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Export to Excel
                        </Button>
                        <Button
                            onClick={onSendMail}
                            disabled={!hasEnrollments}
                        >
                            <Mail className="mr-2 h-4 w-4" />
                            Send Mail
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default EnrollmentActionsBar;
