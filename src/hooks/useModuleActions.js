import { useState } from "react";
import toast from "react-hot-toast";
import {
    useCreateModuleMutation,
    useUpdateModuleMutation,
    useDeleteModuleMutation,
    useToggleModuleActiveStatusMutation,
} from "@/features/modules-apis/moduleApis";

export const useModuleActions = (refetchModules) => {
    const [loadingStates, setLoadingStates] = useState({
        create: false,
        update: false,
        delete: {},
        toggle: {},
    });

    const [createModule] = useCreateModuleMutation();
    const [updateModule] = useUpdateModuleMutation();
    const [deleteModule] = useDeleteModuleMutation();
    const [toggleModuleStatus] = useToggleModuleActiveStatusMutation();

    const handleCreateModule = async (moduleData) => {
        try {
            setLoadingStates(prev => ({ ...prev, create: true }));

            const result = await createModule(moduleData).unwrap();

            toast.success("Module created successfully!");
            refetchModules();

            return result;
        } catch (error) {
            const errorMessage = error?.data?.message || "Failed to create module";
            toast.error(errorMessage);
            throw error;
        } finally {
            setLoadingStates(prev => ({ ...prev, create: false }));
        }
    };

    const handleUpdateModule = async (moduleData) => {
        try {
            setLoadingStates(prev => ({ ...prev, update: true }));

            const result = await updateModule(moduleData).unwrap();

            toast.success("Module updated successfully!");
            refetchModules();

            return result;
        } catch (error) {
            const errorMessage = error?.data?.message || "Failed to update module";
            toast.error(errorMessage);
            throw error;
        } finally {
            setLoadingStates(prev => ({ ...prev, update: false }));
        }
    };

    const handleDeleteModule = async (moduleId) => {
        if (!confirm("Are you sure you want to delete this module? This action cannot be undone.")) {
            return;
        }

        try {
            setLoadingStates(prev => ({
                ...prev,
                delete: { ...prev.delete, [moduleId]: true }
            }));

            await deleteModule(moduleId).unwrap();

            toast.success("Module deleted successfully!");
            refetchModules();
        } catch (error) {
            const errorMessage = error?.data?.message || "Failed to delete module";
            toast.error(errorMessage);
        } finally {
            setLoadingStates(prev => ({
                ...prev,
                delete: { ...prev.delete, [moduleId]: false }
            }));
        }
    };

    const handleToggleModuleStatus = async ({ id, isActive }) => {
        try {
            setLoadingStates(prev => ({
                ...prev,
                toggle: { ...prev.toggle, [id]: true }
            }));

            await toggleModuleStatus({ id, isActive }).unwrap();

            const statusText = isActive ? "activated" : "deactivated";
            toast.success(`Module ${statusText} successfully!`);
            refetchModules();
        } catch (error) {
            const errorMessage = error?.data?.message || "Failed to update module status";
            toast.error(errorMessage);
        } finally {
            setLoadingStates(prev => ({
                ...prev,
                toggle: { ...prev.toggle, [id]: false }
            }));
        }
    };

    return {
        handleCreateModule,
        handleUpdateModule,
        handleDeleteModule,
        handleToggleModuleStatus,
        loadingStates,
    };
};
