import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} from "@/features/category/categoryApis";

const CategoriesPage = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({ name: "" });

    // API hooks
    const { data: categoriesData, isLoading, error, refetch } = useGetCategoriesQuery();
    const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
    const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

    const categories = categoriesData?.data || [];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            toast.error("Category name is required");
            return;
        }

        try {
            if (editingCategory) {
                await updateCategory({ id: editingCategory.id, name: formData.name }).unwrap();
                toast.success("Category updated successfully!");
            } else {
                await createCategory({ name: formData.name }).unwrap();
                toast.success("Category created successfully!");
            }

            setFormData({ name: "" });
            setEditingCategory(null);
            setShowCreateForm(false);
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to save category");
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setFormData({ name: category.name });
        setShowCreateForm(true);
    };

    const handleDelete = async (categoryId) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await deleteCategory(categoryId).unwrap();
                toast.success("Category deleted successfully!");
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || "Failed to delete category");
            }
        }
    };

    const handleCancel = () => {
        setFormData({ name: "" });
        setEditingCategory(null);
        setShowCreateForm(false);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg">Loading categories...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg text-red-600">Error loading categories</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Categories</h1>
                <Button
                    onClick={() => setShowCreateForm(true)}
                    className="flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add Category
                </Button>
            </div>

            {/* Create/Edit Form */}
            {showCreateForm && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            {editingCategory ? "Edit Category" : "Create New Category"}
                            <Button variant="ghost" size="icon" onClick={handleCancel}>
                                <X className="h-4 w-4" />
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Category Name *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    placeholder="Enter category name"
                                    required
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    type="submit"
                                    disabled={isCreating || isUpdating}
                                >
                                    {isCreating || isUpdating ? "Saving..." : (editingCategory ? "Update" : "Create")}
                                </Button>
                                <Button type="button" variant="outline" onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Categories List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                    <Card key={category.id}>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold">{category.name}</h3>
                                    <p className="text-sm text-gray-500">ID: {category.id}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleEdit(category)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDelete(category.id)}
                                        disabled={isDeleting}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {categories.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500">No categories found. Create your first category!</p>
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;
