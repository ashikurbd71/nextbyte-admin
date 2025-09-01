import React, { useState } from "react";
import {
    useGetAllInstructorsQuery,
    useGetInstructorStatsQuery,
    useActivateInstructorMutation,
    useDeactivateInstructorMutation,
    useDeleteInstructorMutation,
} from "@/features/instractor-apis/instractorApis";
import InstructorRegistrationForm from "@/components/instructor/InstructorRegistrationForm";
import InstructorEditModal from "@/components/instructor/InstructorEditModal";
import InstructorDetailsModal from "@/components/instructor/InstructorDetailsModal";
import DataTable from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { Separator } from "@/components/ui/separator";
import {
    UserPlus,
    Users,
    UserCheck,
    UserX,
    TrendingUp,
    DollarSign,
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Facebook,
    Instagram,
    ExternalLink,
    Edit,
    Trash2,
    Eye,
    MoreHorizontal
} from "lucide-react";
import toast from "react-hot-toast";

const InstructorsPage = () => {
    const [showInactiveInstructors, setShowInactiveInstructors] = useState(false);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [selectedInstructorForDetails, setSelectedInstructorForDetails] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [jobTypeFilter, setJobTypeFilter] = useState("all");

    // API hooks
    const {
        data: instructors = { data: [] },
        isLoading: instructorsLoading,
        error: instructorsError,
        refetch: refetchInstructors
    } = useGetAllInstructorsQuery();

    const { data: stats, isLoading: statsLoading } = useGetInstructorStatsQuery();
    const [activateInstructor, { isLoading: activating }] = useActivateInstructorMutation();
    const [deactivateInstructor, { isLoading: deactivating }] = useDeactivateInstructorMutation();
    const [deleteInstructor, { isLoading: deleting }] = useDeleteInstructorMutation();

    // Handle instructor actions
    const handleActivate = async (id) => {
        try {
            console.log("Activating instructor with ID:", id);
            await activateInstructor(id).unwrap();
            toast.success("Instructor activated successfully");
            refetchInstructors();
        } catch (error) {
            console.error("Activate error:", error);
            toast.error(error?.data?.message || "Failed to activate instructor");
        }
    };

    const handleDeactivate = async (id) => {
        try {
            console.log("Deactivating instructor with ID:", id);
            await deactivateInstructor(id).unwrap();
            toast.success("Instructor deactivated successfully");
            refetchInstructors();
        } catch (error) {
            console.error("Deactivate error:", error);
            toast.error(error?.data?.message || "Failed to deactivate instructor");
        }
    };

    const handleDelete = async (id) => {
        try {
            console.log("Deleting instructor with ID:", id);
            await deleteInstructor(id).unwrap();
            toast.success("Instructor deleted successfully");
            refetchInstructors();
        } catch (error) {
            console.error("Delete error:", error);
            toast.error(error?.data?.message || "Failed to delete instructor");
        }
    };

    // Filter instructors
    const filteredInstructors = instructors?.data?.filter(instructor => {
        const matchesStatus = showInactiveInstructors
            ? !instructor.isActive
            : instructor.isActive;

        const matchesSearch = instructor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            instructor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            instructor.designation?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole = roleFilter === "all" || instructor.role === roleFilter;
        const matchesJobType = jobTypeFilter === "all" || instructor.jobType === jobTypeFilter;

        return matchesStatus && matchesSearch && matchesRole && matchesJobType;
    });

    // Create table columns
    const columns = [
        {
            key: "photoUrl",
            header: "Photo",
            cell: (instructor) => (
                <Avatar className="h-10 w-10">
                    <AvatarImage src={instructor.photoUrl} alt={instructor.name} />
                    <AvatarFallback>
                        {instructor.name?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            ),
        },
        {
            key: "name",
            header: "Name",
            cell: (instructor) => (
                <div>
                    <div className="font-medium">{instructor.name}</div>
                    <div className="text-sm text-muted-foreground">{instructor.email}</div>
                </div>
            ),
        },
        {
            key: "designation",
            header: "Designation",
            cell: (instructor) => (
                <Badge variant="">{instructor.designation}</Badge>
            ),
        },
        {
            key: "role",
            header: "Role",
            cell: (instructor) => (
                <Badge variant={instructor.role === "super_admin" ? "destructive" : "default"}>
                    {instructor.role}
                </Badge>
            ),
        },
        {
            key: "jobType",
            header: "Job Type",
            cell: (instructor) => (
                <Badge variant="outline">{instructor.jobType}</Badge>
            ),
        },
        {
            key: "salary",
            header: "Salary",
            cell: (instructor) => (
                <div className="font-medium">
                    ${instructor.salary?.toLocaleString()}
                </div>
            ),
        },
        {
            key: "isActive",
            header: "Status",
            cell: (instructor) => (
                <Badge variant={instructor.isActive ? "default" : "secondary"}>
                    {instructor.isActive ? "Active" : "Inactive"}
                </Badge>
            ),
        },
        {
            key: "actions",
            header: "Actions",
            cell: (instructor) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedInstructorForDetails(instructor)}
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            setSelectedInstructor(instructor);
                            setShowEditModal(true);
                        }}
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                    {instructor.isActive ? (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                console.log("Instructor object:", instructor);
                                handleDeactivate(instructor.id || instructor._id);
                            }}
                            disabled={deactivating}
                        >
                            <UserX className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                console.log("Instructor object:", instructor);
                                handleActivate(instructor.id || instructor._id);
                            }}
                            disabled={activating}
                        >
                            <UserCheck className="h-4 w-4" />
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            console.log("Instructor object:", instructor);
                            handleDelete(instructor.id || instructor._id);
                        }}
                        disabled={deleting}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];



    // Actions bar component
    const InstructorActionsBar = () => (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
                <Button
                    onClick={() => setShowRegistrationForm(true)}
                    className="w-full lg:w-auto"
                >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Instructor
                </Button>

                <Button
                    variant="outline"
                    onClick={() => setShowInactiveInstructors(!showInactiveInstructors)}
                    className="w-full lg:w-auto"
                >
                    {showInactiveInstructors ? "Show Active" : "Show Inactive"}
                </Button>
            </div>

            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
                <Input
                    placeholder="Search instructors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full lg:w-64"
                />

                <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-full lg:w-32">
                        <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="super_admin">Super Admin</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                    <SelectTrigger className="w-full lg:w-32">
                        <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="permanent">Permanent</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="part_time">Part Time</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );

    if (instructorsError) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <h3 className="text-lg font-semibold">Error loading instructors</h3>
                    <p className="text-muted-foreground">Please try again later</p>
                    <Button onClick={refetchInstructors} className="mt-4">
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Instructors Management
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Manage your instructors, roles, and permissions.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Instructors</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.totalInstructors || 0}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats?.activeInstructors || 0} active
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Instructors</CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.activeInstructors || 0}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats?.inactiveInstructors || 0} inactive
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Salary</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${stats?.totalSalary?.toLocaleString() || 0}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Monthly payroll
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Experience</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.averageExperience || 0}</div>
                        <p className="text-xs text-muted-foreground">
                            Years of experience
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Actions Bar */}
            <InstructorActionsBar />

            {/* Instructors DataTable */}
            <DataTable
                data={filteredInstructors}
                columns={columns}
                title={showInactiveInstructors ? "Inactive Instructors" : "Active Instructors"}
                searchPlaceholder="Search instructors by name, email, or designation..."
                searchKeys={['name', 'email', 'designation']}
                itemsPerPage={10}
                loading={instructorsLoading}
                emptyMessage="No instructors found"
            />

            {/* Instructor Details Modal */}
            <InstructorDetailsModal
                instructor={selectedInstructorForDetails}
                onClose={() => setSelectedInstructorForDetails(null)}
            />

            {/* Instructor Registration Form Modal */}
            <InstructorRegistrationForm
                isOpen={showRegistrationForm}
                onClose={() => setShowRegistrationForm(false)}
                onSuccess={refetchInstructors}
            />

            {/* Instructor Edit Modal */}
            <InstructorEditModal
                instructor={selectedInstructor}
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setSelectedInstructor(null);
                }}
                onSuccess={refetchInstructors}
            />
        </div>
    );
};

export default InstructorsPage;
