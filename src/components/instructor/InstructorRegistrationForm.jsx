import React, { useState, useRef } from "react";
import { useRegisterInstructorMutation } from "@/features/instractor-apis/instractorApis";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { X, Upload, UserPlus, Mail, Phone, MapPin, Linkedin, Facebook, Instagram, DollarSign, TrendingUp, Briefcase } from "lucide-react";
import { useFileUpload } from "@/hooks/useFileUpload";
import toast from "react-hot-toast";

// JobType enum
const JobType = {
    PERMANENT: 'permanent',
    CONTRACTUAL: 'contractual',
    PROJECT_BASED: 'project_based'
};

// AdminRole enum
const AdminRole = {
    MODERATOR: 'moderator',
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin'
};

const InstructorRegistrationForm = ({ isOpen, onClose, onSuccess }) => {
    const [registerInstructor, { isLoading }] = useRegisterInstructorMutation();
    const photoInputRef = useRef(null);

    const { uploadFile, isUploading: isPhotoUploading } = useFileUpload({
        folder: 'instructor-photos',
        allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
        maxSize: 2 * 1024 * 1024 // 2MB for profile photos
    });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        bio: "",
        designation: "",
        experience: "",
        fbLink: "",
        linkedinLink: "",
        instaLink: "",
        expertise: [],
        salary: "",
        jobType: "",
        photoUrl: "",
        role: "moderator",
        password: "",
        confirmPassword: ""
    });

    const [expertiseInput, setExpertiseInput] = useState("");
    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    // Handle expertise tags
    const addExpertise = () => {
        if (expertiseInput.trim() && !formData.expertise.includes(expertiseInput.trim())) {
            setFormData(prev => ({
                ...prev,
                expertise: [...prev.expertise, expertiseInput.trim()]
            }));
            setExpertiseInput("");
        }
    };

    const removeExpertise = (index) => {
        setFormData(prev => ({
            ...prev,
            expertise: prev.expertise.filter((_, i) => i !== index)
        }));
    };

    // Handle photo upload
    const handlePhotoUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const cdnUrl = await uploadFile(file);
            handleInputChange("photoUrl", cdnUrl);
        } catch (error) {
            // Error already handled in uploadFile
        }
    };

    // Validation
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";

        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";


        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!formData.designation.trim()) newErrors.designation = "Designation is required";
        if (!formData.experience) newErrors.experience = "Experience is required";
        if (!formData.salary) newErrors.salary = "Salary is required";
        if (!formData.jobType) newErrors.jobType = "Job type is required";
        if (!formData.role) newErrors.role = "Role is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the errors in the form");
            return;
        }

        try {
            const submitData = {
                ...formData,
                experience: parseInt(formData.experience),
                salary: parseFloat(formData.salary),
                // Remove confirmPassword from submission
                confirmPassword: undefined
            };

            await registerInstructor(submitData).unwrap();
            toast.success("Instructor registered successfully!");
            onSuccess?.();
            handleClose();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to register instructor");
        }
    };

    // Handle form close
    const handleClose = () => {
        setFormData({
            name: "",
            email: "",
            phone: "",
            bio: "",
            designation: "",
            experience: "",
            fbLink: "",
            linkedinLink: "",
            instaLink: "",
            expertise: [],
            salary: "",
            jobType: "",
            photoUrl: "",
            role: "moderator",
            password: "",
            confirmPassword: ""
        });
        setExpertiseInput("");
        setErrors({});
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <UserPlus className="h-5 w-5" />
                        Register New Instructor
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        placeholder="Enter full name"
                                        className={errors.name ? "border-red-500" : ""}
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        placeholder="Enter email address"
                                        className={errors.email ? "border-red-500" : ""}
                                    />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number *</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                        placeholder="Enter phone number (e.g., +1234567890)"
                                        className={errors.phone ? "border-red-500" : ""}
                                    />
                                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="designation">Designation *</Label>
                                    <Input
                                        id="designation"
                                        value={formData.designation}
                                        onChange={(e) => handleInputChange("designation", e.target.value)}
                                        placeholder="e.g., Senior Developer, CEO"
                                        className={errors.designation ? "border-red-500" : ""}
                                    />
                                    {errors.designation && <p className="text-sm text-red-500">{errors.designation}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="experience">Years of Experience *</Label>
                                    <Input
                                        id="experience"
                                        type="number"
                                        min="0"
                                        value={formData.experience}
                                        onChange={(e) => handleInputChange("experience", e.target.value)}
                                        placeholder="Enter years of experience"
                                        className={errors.experience ? "border-red-500" : ""}
                                    />
                                    {errors.experience && <p className="text-sm text-red-500">{errors.experience}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    value={formData.bio}
                                    onChange={(e) => handleInputChange("bio", e.target.value)}
                                    placeholder="Tell us about the instructor's background and expertise..."
                                    rows={3}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Professional Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Professional Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role *</Label>
                                    <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                                        <SelectTrigger className={errors.role ? "border-red-500" : ""}>
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="instructor">Instructor</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="super_admin">Super Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="jobType">Job Type *</Label>
                                    <Select value={formData.jobType} onValueChange={(value) => handleInputChange("jobType", value)}>
                                        <SelectTrigger className={errors.jobType ? "border-red-500" : ""}>
                                            <SelectValue placeholder="Select job type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={JobType.PERMANENT}>Permanent</SelectItem>
                                            <SelectItem value={JobType.CONTRACTUAL}>Contractual</SelectItem>
                                            <SelectItem value={JobType.PROJECT_BASED}>Project Based</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.jobType && <p className="text-sm text-red-500">{errors.jobType}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="salary">Salary (USD) *</Label>
                                    <Input
                                        id="salary"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.salary}
                                        onChange={(e) => handleInputChange("salary", e.target.value)}
                                        placeholder="Enter salary"
                                        className={errors.salary ? "border-red-500" : ""}
                                    />
                                    {errors.salary && <p className="text-sm text-red-500">{errors.salary}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="expertise">Areas of Expertise</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="expertise"
                                        value={expertiseInput}
                                        onChange={(e) => setExpertiseInput(e.target.value)}
                                        placeholder="Add expertise (e.g., JavaScript, React)"
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExpertise())}
                                    />
                                    <Button type="button" variant="outline" onClick={addExpertise}>
                                        Add
                                    </Button>
                                </div>
                                {formData.expertise.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.expertise.map((skill, index) => (
                                            <Badge key={index} variant="" className="flex items-center gap-1">
                                                {skill}
                                                <X
                                                    className="h-3 w-3 cursor-pointer"
                                                    onClick={() => removeExpertise(index)}
                                                />
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Social Media Links */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Social Media Links</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fbLink">Facebook Profile</Label>
                                    <Input
                                        id="fbLink"
                                        type="url"
                                        value={formData.fbLink}
                                        onChange={(e) => handleInputChange("fbLink", e.target.value)}
                                        placeholder="https://facebook.com/username"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="linkedinLink">LinkedIn Profile</Label>
                                    <Input
                                        id="linkedinLink"
                                        type="url"
                                        value={formData.linkedinLink}
                                        onChange={(e) => handleInputChange("linkedinLink", e.target.value)}
                                        placeholder="https://linkedin.com/in/username"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="instaLink">Instagram Profile</Label>
                                    <Input
                                        id="instaLink"
                                        type="url"
                                        value={formData.instaLink}
                                        onChange={(e) => handleInputChange("instaLink", e.target.value)}
                                        placeholder="https://instagram.com/username"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Profile Photo */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Profile Photo</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={formData.photoUrl} alt="Profile" />
                                    <AvatarFallback>
                                        <Upload className="h-8 w-8" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-2">
                                    <Label htmlFor="photoUrl">Photo URL</Label>
                                    <Input
                                        id="photoUrl"
                                        value={formData.photoUrl}
                                        onChange={(e) => handleInputChange("photoUrl", e.target.value)}
                                        placeholder="CDN URL or upload file"
                                        disabled={isPhotoUploading}
                                    />
                                    <div className="flex items-center gap-2">
                                        <input
                                            ref={photoInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoUpload}
                                            className="hidden"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => photoInputRef.current?.click()}
                                            disabled={isPhotoUploading}
                                            className="flex items-center gap-2"
                                        >
                                            <Upload className="h-4 w-4" />
                                            {isPhotoUploading ? "Uploading..." : "Upload Photo"}
                                        </Button>
                                        {formData.photoUrl && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleInputChange("photoUrl", "")}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Clear
                                            </Button>
                                        )}
                                    </div>
                                    {formData.photoUrl && (
                                        <div className="mt-2">
                                            <img
                                                src={formData.photoUrl}
                                                alt="Profile photo preview"
                                                className="w-20 h-20 object-cover rounded-lg border"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Security</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password *</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => handleInputChange("password", e.target.value)}
                                        placeholder="Enter password"
                                        className={errors.password ? "border-red-500" : ""}
                                    />
                                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                        placeholder="Confirm password"
                                        className={errors.confirmPassword ? "border-red-500" : ""}
                                    />
                                    {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Registering..." : "Register Instructor"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default InstructorRegistrationForm;
