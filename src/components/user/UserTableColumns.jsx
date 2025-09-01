import { Mail, Phone } from "lucide-react";
import { formatDate } from "@/utils/userUtils";
import UserStatusBadge from "./UserStatusBadge";
import UserTableActions from "./UserTableActions";

export const createUserTableColumns = ({
    onViewDetails,
    onViewEnrollment,
    onToggleStatus,
    onUnban,
    onVerify,
    onBan,
    onDelete,
    loadingStates
}) => [
        {
            key: 'name',
            header: 'User',
            cell: (user) => (
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                            {user.name || "Unknown User"}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {user.email}
                        </p>
                    </div>
                </div>
            )
        },
        {
            key: 'status',
            header: 'Status',
            cell: (user) => (
                <UserStatusBadge
                    isActive={user.isActive}
                    isBanned={user.isBanned}
                    isVerified={user.isVerified}
                />
            )
        },
        {
            key: 'contact',
            header: 'Contact',
            cell: (user) => (
                <div className="space-y-1">
                    <div className="flex items-center space-x-1 text-sm">
                        <Mail className="h-3 w-3 text-slate-400" />
                        <span className="text-slate-600 dark:text-slate-400">{user.email}</span>
                    </div>
                    {user.phone && (
                        <div className="flex items-center space-x-1 text-sm">
                            <Phone className="h-3 w-3 text-slate-400" />
                            <span className="text-slate-600 dark:text-slate-400">{user.phone}</span>
                        </div>
                    )}
                </div>
            )
        },
        {
            key: 'createdAt',
            header: 'Joined',
            accessor: (user) => formatDate(user.createdAt),
            sortable: true
        },
        {
            key: 'actions',
            header: 'Actions',
            sortable: false,
            cell: (user) => (
                <UserTableActions
                    user={user}
                    onViewDetails={onViewDetails}
                    onViewEnrollment={onViewEnrollment}
                    onToggleStatus={onToggleStatus}
                    onUnban={onUnban}
                    onVerify={onVerify}
                    onBan={onBan}
                    onDelete={onDelete}
                    loadingStates={loadingStates}
                />
            )
        }
    ];
