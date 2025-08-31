import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, CheckCircle, User, Eye, Edit, Trash2 } from "lucide-react";

// Get status badge component
export const getStatusBadge = (status) => {
    const statusConfig = {
        open: { variant: "default", icon: Clock, text: "Open" },
        assigned: { variant: "secondary", icon: Users, text: "Assigned" },
        closed: { variant: "outline", icon: CheckCircle, text: "Closed" },
    };

    const config = statusConfig[status] || statusConfig.open;
    const Icon = config.icon;

    return (
        <Badge variant={config.variant} className="flex items-center gap-1">
            <Icon className="h-3 w-3" />
            {config.text}
        </Badge>
    );
};

// Table columns configuration
export const getTableColumns = (getStatusBadge, onViewDetails, onAssignTicket, onCloseTicket, onDeleteTicket, loadingStates) => [
    {
        key: "serialNumber",
        label: "Serial",
        sortable: true,
        render: (value) => `#${value}`,
    },
    {
        key: "title",
        label: "Title",
        sortable: true,
        render: (value, row) => (
            <div className="max-w-xs">
                <div className="font-medium truncate">{value}</div>
                <div className="text-sm text-gray-500 truncate">{row.description}</div>
            </div>
        ),
    },
    {
        key: "user.name",
        label: "User",
        sortable: true,
        render: (value, row) => (
            <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                    <div className="font-medium">{value}</div>
                    <div className="text-sm text-gray-500">{row.user.email}</div>
                </div>
            </div>
        ),
    },
    {
        key: "status",
        label: "Status",
        sortable: true,
        render: (value) => getStatusBadge(value),
    },
    {
        key: "mentor.name",
        label: "Mentor",
        sortable: true,
        render: (value, row) => {
            if (!row.mentor) {
                return <span className="text-gray-400">Not assigned</span>;
            }
            return (
                <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <div>
                        <div className="font-medium">{value}</div>
                        <div className="text-sm text-gray-500">{row.mentor.email}</div>
                    </div>
                </div>
            );
        },
    },
    {
        key: "createdAt",
        label: "Created",
        sortable: true,
        render: (value) => new Date(value).toLocaleDateString(),
    },
    {
        key: "actions",
        label: "Actions",
        sortable: false,
        render: (value, row) => (
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(row)}
                    title="View Details"
                >
                    <Eye className="h-4 w-4" />
                </Button>

                {row.status === "open" && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onAssignTicket(row)}
                        title="Assign Ticket"
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                )}

                {row.status !== "closed" && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onCloseTicket(row.id)}
                        disabled={loadingStates[`close-${row.id}`]}
                        title="Close Ticket"
                    >
                        <CheckCircle className="h-4 w-4" />
                    </Button>
                )}

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteTicket(row.id)}
                    disabled={loadingStates[`delete-${row.id}`]}
                    title="Delete Ticket"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        ),
    },
];

