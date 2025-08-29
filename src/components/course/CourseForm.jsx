import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Upload, BookOpen, Plus, Trash2, Video, Tag, Image as ImageIcon, ChevronDown, Check } from "lucide-react";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useGetCategoriesQuery } from "@/features/category/categoryApis";
import { useGetAllInstructorsQuery } from "@/features/instractor-apis/instractorApis";

const CourseForm = ({ course, onSubmit, onClose, isLoading = false }) => {
    const thumbnailInputRef = useRef(null);
    const { uploadFile, isUploading: isThumbnailUploading } = useFileUpload({
        folder: 'course-thumbnails',
        allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
        maxSize: 2 * 1024 * 1024 // 2MB for thumbnails
    });

    const { uploadFile: uploadTechImage, isUploading: isTechImageUploading } = useFileUpload({
        folder: 'technology-images',
        allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
        maxSize: 1 * 1024 * 1024 // 1MB for tech images
    });

    const [formData, setFormData] = useState({
        name: "",
        slugName: "",
        description: "",
        duration: "",
        price: "",
        discountPrice: "",
        totalSeat: "",
        whatYouWillLearn: [""],
        technologies: [{ name: "", image: "" }],
        requirements: [""],
        promoVideoUrl: "",
        thumbnail: "",
        categoryId: "",
        instructorIds: [],
        level: "beginner",
        isPublished: false,
        isPublic: false,
    });

    useEffect(() => {
        if (course) {
            // Handle instructor IDs - convert to array if it's a string or single ID
            let instructorIdsArray = [];
            if (course.instructorIds) {
                if (Array.isArray(course.instructorIds)) {
                    instructorIdsArray = course.instructorIds;
                } else if (typeof course.instructorIds === 'string') {
                    instructorIdsArray = course.instructorIds.split(',').map(id => id.trim()).filter(id => id !== '');
                } else {
                    instructorIdsArray = [course.instructorIds.toString()];
                }
            } else if (course.instructorId) {
                instructorIdsArray = [course.instructorId.toString()];
            } else if (course.instructor?.id) {
                instructorIdsArray = [course.instructor.id.toString()];
            } else if (course.instructors && Array.isArray(course.instructors)) {
                // Handle the new API structure where instructors is an array
                instructorIdsArray = course.instructors.map(instructor => instructor.id.toString());
                console.log('Found instructors in course.instructors:', course.instructors);
                console.log('Extracted instructor IDs:', instructorIdsArray);
            }

            console.log('Course data for form:', course);
            console.log('Instructor IDs array:', instructorIdsArray);

            // If no instructors are found, initialize with empty array
            if (instructorIdsArray.length === 0) {
                console.log('No instructors found, initializing with empty array');
            }

            setFormData({
                name: course.name || course.title || "",
                slugName: course.slugName || "",
                description: course.description || "",
                duration: course.duration || "",
                price: course.price || "",
                discountPrice: course.discountPrice || "",
                totalSeat: course.totalSeat || "",
                whatYouWillLearn: course.whatYouWillLearn || [""],
                technologies: course.technologies || [{ name: "", image: "" }],
                requirements: course.requirements || [""],
                promoVideoUrl: course.promoVideoUrl || "",
                thumbnail: course.thumbnail || "",
                categoryId: course.categoryId || course.category?.id || "",
                instructorIds: instructorIdsArray,
                level: course.level || "beginner",
                isPublished: course.isPublished || false,
                isPublic: course.isPublic || false,
            });
        }
    }, [course]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle array fields
    const handleArrayChange = (field, index, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }));
    };

    const addArrayItem = (field) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], field === "technologies" ? { name: "", image: "" } : ""]
        }));
    };

    const removeArrayItem = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    // Handle technology object changes
    const handleTechnologyChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            technologies: prev.technologies.map((tech, i) =>
                i === index ? { ...tech, [field]: value } : tech
            )
        }));
    };

    // Handle thumbnail upload
    const handleThumbnailUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const cdnUrl = await uploadFile(file);
            handleInputChange("thumbnail", cdnUrl);
        } catch (error) {
            // Error already handled in uploadFile
        }
    };

    // Handle technology image upload
    const handleTechnologyImageUpload = async (index, event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const cdnUrl = await uploadTechImage(file);
            handleTechnologyChange(index, "image", cdnUrl);
        } catch (error) {
            // Error already handled in uploadFile
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Form submission - instructor IDs:', formData.instructorIds);
        console.log('Form submission - instructor validation:', instructorValidation);

        // Validate instructor IDs before submission
        if (!instructorValidation.isValid) {
            alert("Please fix the instructor ID validation errors before submitting.");
            return;
        }

        // Clean up empty array items
        const cleanData = {
            ...formData,
            whatYouWillLearn: formData.whatYouWillLearn.filter(item => item.trim() !== ""),
            requirements: formData.requirements.filter(item => item.trim() !== ""),
            technologies: formData.technologies.filter(tech => tech.name.trim() !== ""),
            price: formData.price ? parseFloat(formData.price) : 0,
            discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : 0,
            totalSeat: formData.totalSeat ? parseInt(formData.totalSeat) : 0,
            categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
            instructorIds: formData.instructorIds || [],
        };

        console.log('Clean data for submission:', cleanData);
        onSubmit(cleanData);
    };

    // Generate slug from name
    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    };

    // Get categories from API
    const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesQuery();
    const categories = categoriesData?.data || [];

    // Get instructors from API
    const { data: instructorsData, isLoading: instructorsLoading } = useGetAllInstructorsQuery();
    const instructors = instructorsData?.data || [];

    console.log('Instructors data:', instructorsData);
    console.log('Instructors array:', instructors);

    // Validate instructor IDs
    const validateInstructorIds = (instructorIds) => {
        console.log('Validating instructor IDs:', instructorIds);
        console.log('Available instructor IDs:', instructors.map(instructor => instructor.id.toString()));

        if (!instructorIds || instructorIds.length === 0) return { isValid: true, message: "" };

        const availableIds = instructors.map(instructor => instructor.id.toString());
        const invalidIds = instructorIds.filter(id => !availableIds.includes(id.toString()));

        if (invalidIds.length > 0) {
            console.log('Invalid instructor IDs found:', invalidIds);
            return {
                isValid: false,
                message: `Invalid instructor IDs: ${invalidIds.join(', ')}`
            };
        }

        console.log('All instructor IDs are valid');
        return { isValid: true, message: "" };
    };

    const instructorValidation = instructors.length > 0 ? validateInstructorIds(formData.instructorIds) : { isValid: true, message: "" };

    console.log('Instructor validation result:', instructorValidation);

    // Get selected instructor names
    const getSelectedInstructorNames = () => {
        console.log('Getting selected instructor names for IDs:', formData.instructorIds);
        console.log('Available instructors:', instructors);

        if (!formData.instructorIds || formData.instructorIds.length === 0) return [];

        return formData.instructorIds.map(id => {
            const instructor = instructors.find(inst => inst.id.toString() === id.toString());
            console.log(`Looking for instructor ID ${id}, found:`, instructor);
            return instructor ? instructor.name : `Unknown (ID: ${id})`;
        });
    };

    const selectedInstructorNames = getSelectedInstructorNames();

    const handleNameChange = (value) => {
        handleInputChange("name", value);
        if (!formData.slugName || formData.slugName === generateSlug(formData.name)) {
            handleInputChange("slugName", generateSlug(value));
        }
    };

    // Handle instructor selection
    const handleInstructorToggle = (instructorId) => {
        const idString = instructorId.toString();
        console.log('Toggling instructor ID:', idString);
        console.log('Current instructor IDs:', formData.instructorIds);

        setFormData(prev => {
            const newInstructorIds = prev.instructorIds.includes(idString)
                ? prev.instructorIds.filter(id => id !== idString)
                : [...prev.instructorIds, idString];

            console.log('New instructor IDs:', newInstructorIds);
            return {
                ...prev,
                instructorIds: newInstructorIds
            };
        });
    };

    const levels = [
        { value: "beginner", label: "Beginner" },
        { value: "intermediate", label: "Intermediate" },
        { value: "advanced", label: "Advanced" }
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-xl font-semibold">
                        {course ? "Edit Course" : "Create New Course"}
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="h-8 w-8"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Basic Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Course Name *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => handleNameChange(e.target.value)}
                                        placeholder="Enter course name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slugName">Slug Name</Label>
                                    <Input
                                        id="slugName"
                                        value={formData.slugName}
                                        onChange={(e) => handleInputChange("slugName", e.target.value)}
                                        placeholder="course-slug-name"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange("description", e.target.value)}
                                    placeholder="Enter course description"
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price ($)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => handleInputChange("price", e.target.value)}
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="discountPrice">Discount Price ($)</Label>
                                    <Input
                                        id="discountPrice"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.discountPrice}
                                        onChange={(e) => handleInputChange("discountPrice", e.target.value)}
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="duration">Duration (hours)</Label>
                                    <Input
                                        id="duration"
                                        type="number"
                                        min="0"
                                        value={formData.duration}
                                        onChange={(e) => handleInputChange("duration", e.target.value)}
                                        placeholder="e.g., 20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="totalSeat">Total Seats</Label>
                                    <Input
                                        id="totalSeat"
                                        type="number"
                                        min="0"
                                        value={formData.totalSeat}
                                        onChange={(e) => handleInputChange("totalSeat", e.target.value)}
                                        placeholder="e.g., 100"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="categoryId">Category *</Label>
                                    <Select
                                        value={formData.categoryId.toString()}
                                        onValueChange={(value) => handleInputChange("categoryId", value)}
                                        disabled={categoriesLoading}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder={categoriesLoading ? "Loading categories..." : "Select category"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id.toString()}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="instructorIds">Instructors *</Label>
                                    <div className="space-y-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className="w-full justify-between"
                                                    disabled={instructorsLoading}
                                                >
                                                    {selectedInstructorNames.length > 0
                                                        ? `${selectedInstructorNames.length} instructor(s) selected: ${selectedInstructorNames.join(', ')}`
                                                        : formData.instructorIds.length > 0
                                                            ? `${formData.instructorIds.length} instructor(s) selected (IDs: ${formData.instructorIds.join(', ')})`
                                                            : instructorsLoading
                                                                ? "Loading instructors..."
                                                                : "Select instructors"
                                                    }
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-full min-w-[200px] max-h-[300px] overflow-y-auto">
                                                <DropdownMenuLabel>Select Instructors</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                {instructors.length === 0 ? (
                                                    <DropdownMenuCheckboxItem disabled>
                                                        No instructors available
                                                    </DropdownMenuCheckboxItem>
                                                ) : (
                                                    instructors.map((instructor) => {
                                                        const isChecked = formData.instructorIds.includes(instructor.id.toString());
                                                        console.log(`Instructor ${instructor.name} (ID: ${instructor.id}) checked:`, isChecked);
                                                        return (
                                                            <DropdownMenuCheckboxItem
                                                                key={instructor.id}
                                                                checked={isChecked}
                                                                onCheckedChange={() => handleInstructorToggle(instructor.id)}
                                                            >
                                                                {instructor.name}
                                                            </DropdownMenuCheckboxItem>
                                                        );
                                                    })
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        {selectedInstructorNames.length > 0 && (
                                            <div className="text-xs text-blue-600">
                                                Selected: {selectedInstructorNames.join(', ')}
                                            </div>
                                        )}
                                        {formData.instructorIds.length > 0 && selectedInstructorNames.length === 0 && (
                                            <div className="text-xs text-orange-600">
                                                Warning: Instructor IDs found but names not resolved: {formData.instructorIds.join(', ')}
                                            </div>
                                        )}
                                        {!instructorValidation.isValid && (
                                            <div className="text-xs text-red-500">
                                                {instructorValidation.message}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="level">Level</Label>
                                    <Select
                                        value={formData.level}
                                        onValueChange={(value) => handleInputChange("level", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {levels.map((level) => (
                                                <SelectItem key={level.value} value={level.value}>
                                                    {level.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* What You Will Learn */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                    What You Will Learn
                                </h3>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addArrayItem("whatYouWillLearn")}
                                    className="flex items-center gap-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Learning Point
                                </Button>
                            </div>

                            {formData.whatYouWillLearn.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Input
                                        value={item}
                                        onChange={(e) => handleArrayChange("whatYouWillLearn", index, e.target.value)}
                                        placeholder="Enter learning point"
                                        className="flex-1"
                                    />
                                    {formData.whatYouWillLearn.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeArrayItem("whatYouWillLearn", index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Technologies */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                    <Tag className="h-5 w-5" />
                                    Technologies
                                </h3>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addArrayItem("technologies")}
                                    className="flex items-center gap-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Technology
                                </Button>
                            </div>

                            {formData.technologies.map((tech, index) => (
                                <div key={index} className="space-y-2 p-4 border rounded-lg">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <Input
                                            value={tech.name}
                                            onChange={(e) => handleTechnologyChange(index, "name", e.target.value)}
                                            placeholder="Technology name"
                                        />
                                        <Input
                                            value={tech.image}
                                            onChange={(e) => handleTechnologyChange(index, "image", e.target.value)}
                                            placeholder="CDN URL or upload image"
                                            disabled={isTechImageUploading}
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleTechnologyImageUpload(index, e)}
                                            className="hidden"
                                            id={`tech-image-${index}`}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => document.getElementById(`tech-image-${index}`)?.click()}
                                            disabled={isTechImageUploading}
                                            className="flex items-center gap-2"
                                        >
                                            <Upload className="h-4 w-4" />
                                            {isTechImageUploading ? "Uploading..." : "Upload Image"}
                                        </Button>
                                        {tech.image && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleTechnologyChange(index, "image", "")}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Clear
                                            </Button>
                                        )}
                                        {formData.technologies.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeArrayItem("technologies", index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                    {tech.image && (
                                        <div className="mt-2">
                                            <img
                                                src={tech.image}
                                                alt={`${tech.name} preview`}
                                                className="w-16 h-16 object-cover rounded-lg border"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Requirements */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                    Requirements
                                </h3>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addArrayItem("requirements")}
                                    className="flex items-center gap-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Requirement
                                </Button>
                            </div>

                            {formData.requirements.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Input
                                        value={item}
                                        onChange={(e) => handleArrayChange("requirements", index, e.target.value)}
                                        placeholder="Enter requirement"
                                        className="flex-1"
                                    />
                                    {formData.requirements.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeArrayItem("requirements", index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Media */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Media
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="promoVideoUrl" className="flex items-center gap-2">
                                        <Video className="h-4 w-4" />
                                        Promo Video URL
                                    </Label>
                                    <Input
                                        id="promoVideoUrl"
                                        value={formData.promoVideoUrl}
                                        onChange={(e) => handleInputChange("promoVideoUrl", e.target.value)}
                                        placeholder="https://example.com/promo.mp4"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="thumbnail" className="flex items-center gap-2">
                                        <ImageIcon className="h-4 w-4" />
                                        Course Thumbnail
                                    </Label>
                                    <div className="space-y-2">
                                        <Input
                                            id="thumbnail"
                                            value={formData.thumbnail}
                                            onChange={(e) => handleInputChange("thumbnail", e.target.value)}
                                            placeholder="CDN URL or upload file"
                                            disabled={isThumbnailUploading}
                                        />
                                        <div className="flex items-center gap-2">
                                            <input
                                                ref={thumbnailInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleThumbnailUpload}
                                                className="hidden"
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => thumbnailInputRef.current?.click()}
                                                disabled={isThumbnailUploading}
                                                className="flex items-center gap-2"
                                            >
                                                <Upload className="h-4 w-4" />
                                                {isThumbnailUploading ? "Uploading..." : "Upload Image"}
                                            </Button>
                                            {formData.thumbnail && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleInputChange("thumbnail", "")}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Clear
                                                </Button>
                                            )}
                                        </div>
                                        {formData.thumbnail && (
                                            <div className="mt-2">
                                                <img
                                                    src={formData.thumbnail}
                                                    alt="Course thumbnail preview"
                                                    className="w-20 h-20 object-cover rounded-lg border"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status Toggles */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Course Status
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="isPublished"
                                        checked={formData.isPublished}
                                        onCheckedChange={(checked) => handleInputChange("isPublished", checked)}
                                    />
                                    <Label htmlFor="isPublished">Publish course immediately</Label>
                                    <span className="text-xs text-slate-400 ml-2">
                                        (Current: {formData.isPublished ? 'true' : 'false'})
                                    </span>
                                </div>



                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end space-x-3 pt-4 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="flex items-center gap-2"
                            >
                                <BookOpen className="h-4 w-4" />
                                {isLoading ? "Saving..." : (course ? "Update Course" : "Create Course")}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CourseForm;
