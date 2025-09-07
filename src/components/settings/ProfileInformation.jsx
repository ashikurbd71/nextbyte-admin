import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, X, Upload } from "lucide-react";
import { useFileUpload } from "@/hooks/useFileUpload";

// JobType enum
const JobType = {
    PERMANENT: 'permanent',
    CONTRACTUAL: 'contractual',
    PROJECT_BASED: 'project_based'
};

const ProfileInformation = ({
    profileData,
    errors,
    expertiseInput,
    setExpertiseInput,
    handleProfileChange,
    addExpertise,
    removeExpertise
}) => {
    const photoInputRef = useRef(null);

    // File upload hook
    const { uploadFile, isUploading: isPhotoUploading } = useFileUpload({
        folder: 'admin-photos',
        allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
        maxSize: 2 * 1024 * 1024 // 2MB for profile photos
    });

    // Handle photo upload
    const handlePhotoUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const cdnUrl = await uploadFile(file);
            handleProfileChange("photoUrl", cdnUrl);
        } catch (error) {
            // Error already handled in uploadFile
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <User className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                        <CardTitle>Profile Information</CardTitle>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Update your personal and professional information
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => handleProfileChange("name", e.target.value)}
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
                            value={profileData.email}
                            onChange={(e) => handleProfileChange("email", e.target.value)}
                            placeholder="Enter email address"
                            className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="designation">Designation *</Label>
                        <Input
                            id="designation"
                            value={profileData.designation}
                            onChange={(e) => handleProfileChange("designation", e.target.value)}
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
                            value={profileData.experience}
                            onChange={(e) => handleProfileChange("experience", e.target.value)}
                            placeholder="Enter years of experience"
                            className={errors.experience ? "border-red-500" : ""}
                        />
                        {errors.experience && <p className="text-sm text-red-500">{errors.experience}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                            id="phone"
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => handleProfileChange("phone", e.target.value)}
                            placeholder="Enter phone number (e.g., +1234567890)"
                            className={errors.phone ? "border-red-500" : ""}
                        />
                        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                    </div>





                </div>

                <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => handleProfileChange("bio", e.target.value)}
                        placeholder="Tell us about your background and expertise..."
                        rows={3}
                    />
                </div>

                {/* Areas of Expertise */}
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
                    {profileData.expertise.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {profileData.expertise.map((skill, index) => (
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

                {/* Social Media Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="fbLink">Facebook Profile</Label>
                        <Input
                            id="fbLink"
                            type="url"
                            value={profileData.fbLink}
                            onChange={(e) => handleProfileChange("fbLink", e.target.value)}
                            placeholder="https://facebook.com/username"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="linkedinLink">LinkedIn Profile</Label>
                        <Input
                            id="linkedinLink"
                            type="url"
                            value={profileData.linkedinLink}
                            onChange={(e) => handleProfileChange("linkedinLink", e.target.value)}
                            placeholder="https://linkedin.com/in/username"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="instaLink">Instagram Profile</Label>
                        <Input
                            id="instaLink"
                            type="url"
                            value={profileData.instaLink}
                            onChange={(e) => handleProfileChange("instaLink", e.target.value)}
                            placeholder="https://instagram.com/username"
                        />
                    </div>
                </div>

                {/* Profile Photo */}
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={profileData.photoUrl} alt="Profile" />
                        <AvatarFallback>
                            <Upload className="h-8 w-8" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                        <Label htmlFor="photoUrl">Photo URL</Label>
                        <Input
                            id="photoUrl"
                            value={profileData.photoUrl}
                            onChange={(e) => handleProfileChange("photoUrl", e.target.value)}
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
                            {profileData.photoUrl && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleProfileChange("photoUrl", "")}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Clear
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProfileInformation;
