import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Download, RefreshCw } from "lucide-react";

const ReviewsHeader = ({
    onRefresh,
    onExport,
    onCreateClick,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    children
}) => {
    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Reviews Management</h1>
                <p className="text-gray-600 mt-2">Manage all course reviews and ratings</p>
            </div>
            <div className="flex gap-2">
                <Button onClick={onRefresh} variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                </Button>
                <Button onClick={onExport} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                </Button>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={onCreateClick}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Review
                        </Button>
                    </DialogTrigger>
                    {children}
                </Dialog>
            </div>
        </div>
    );
};

export default ReviewsHeader;
