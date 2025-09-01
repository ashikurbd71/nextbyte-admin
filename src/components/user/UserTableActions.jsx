import { Button } from "@/components/ui/button";
import {
    Eye,
    GraduationCap,
    ToggleLeft,
    ToggleRight,
    Unlock,
    UserCheck,
    Ban,
    Trash2
} from "lucide-react";

const UserTableActions = ({
    user,
    onViewDetails,
    onViewEnrollment,
    onToggleStatus,
    onUnban,
    onVerify,
    onBan,
    onDelete,
    loadingStates
}) => {
    const {
        activateLoading,
        deactivateLoading,
        unbanLoading,
        verifyLoading,
        banLoading,
        deleteLoading
    } = loadingStates;

    return (
        <div className="flex items-center space-x-1">
            <Button
                variant="ghost"
                size="icon"
                title="View Details"
                onClick={(e) => {
                    e.stopPropagation();
                    onViewDetails(user.id);
                }}
            >
                <Eye className="h-4 w-4" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                title="View Enrollment Performance"
                onClick={(e) => {
                    e.stopPropagation();
                    onViewEnrollment({ id: user.id, name: user.name });
                }}
            >
                <GraduationCap className="h-4 w-4" />
            </Button>

            <Button
                variant="outline"
                size="sm"
                title={user.isActive ? "Deactivate User" : "Activate User"}
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleStatus(user.id, user.isActive);
                }}
                disabled={activateLoading || deactivateLoading}
                className={`transition-colors ${user.isActive
                    ? "border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900/20"
                    }`}
            >
                {user.isActive ? (
                    <>
                        <ToggleRight className="h-4 w-4 mr-1" />
                        Deactivate
                    </>
                ) : (
                    <>
                        <ToggleLeft className="h-4 w-4 mr-1" />
                        Activate
                    </>
                )}
            </Button>

            {user.isBanned ? (
                <Button
                    variant="ghost"
                    size="icon"
                    title="Unban User"
                    onClick={(e) => {
                        e.stopPropagation();
                        onUnban(user.id);
                    }}
                    disabled={unbanLoading}
                >
                    <Unlock className="h-4 w-4" />
                </Button>
            ) : (
                <>
                    {!user.isVerified && (
                        <Button
                            variant="ghost"
                            size="icon"
                            title="Verify User"
                            onClick={(e) => {
                                e.stopPropagation();
                                onVerify(user.id);
                            }}
                            disabled={verifyLoading}
                        >
                            <UserCheck className="h-4 w-4" />
                        </Button>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        title="Ban User"
                        onClick={(e) => {
                            e.stopPropagation();
                            onBan(user.id);
                        }}
                        disabled={banLoading}
                    >
                        <Ban className="h-4 w-4" />
                    </Button>
                </>
            )}

            <Button
                variant="ghost"
                size="icon"
                title="Delete User"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(user.id);
                }}
                disabled={deleteLoading}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default UserTableActions;
