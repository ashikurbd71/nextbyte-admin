import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Search,
    Download,
    Filter,
    RefreshCw
} from 'lucide-react';

const AssignmentSubmissionActionsBar = ({
    onSearch,
    onFilter,
    onExport,
    onRefresh,
    searchValue = '',
    selectedStatus = 'all',
    selectedAssignment = 'all',
    selectedStudent = 'all',
    assignments = [],
    students = [],
    isLoading = false
}) => {
    const handleSearchChange = (e) => {
        onSearch(e.target.value);
    };

    const handleStatusChange = (value) => {
        onFilter({ ...getCurrentFilters(), status: value });
    };

    const handleAssignmentChange = (value) => {
        onFilter({ ...getCurrentFilters(), assignmentId: value });
    };

    const handleStudentChange = (value) => {
        onFilter({ ...getCurrentFilters(), studentId: value });
    };

    const getCurrentFilters = () => ({
        status: selectedStatus,
        assignmentId: selectedAssignment,
        studentId: selectedStudent
    });

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-card rounded-lg border">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Search submissions..."
                        value={searchValue}
                        onChange={handleSearchChange}
                        className="pl-10"
                    />
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-2">
                    {/* Status Filter */}
                    <Select value={selectedStatus} onValueChange={handleStatusChange}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Assignment Filter */}
                    <Select value={selectedAssignment} onValueChange={handleAssignmentChange}>
                        <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="Assignment" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Assignments</SelectItem>
                            {assignments.map((assignment) => (
                                <SelectItem key={assignment.id} value={assignment.id.toString()}>
                                    {assignment.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Student Filter */}
                    <Select value={selectedStudent} onValueChange={handleStudentChange}>
                        <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="Student" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Students</SelectItem>
                            {students.map((student) => (
                                <SelectItem key={student.id} value={student.id.toString()}>
                                    {student.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onRefresh}
                    disabled={isLoading}
                >
                    <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={onExport}
                    disabled={isLoading}
                >
                    <Download className="h-4 w-4" />
                    Export
                </Button>
            </div>
        </div>
    );
};

export default AssignmentSubmissionActionsBar;
