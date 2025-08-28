import { useState } from 'react';
import { uploadToCDN, validateFile } from '@/utils/cdn-upload';
import { toast } from 'react-hot-toast';

export const useFileUpload = (options = {}) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const {
        allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
        maxSize = 5 * 1024 * 1024, // 5MB
        folder = 'courses'
    } = options;

    const uploadFile = async (file) => {
        try {
            setIsUploading(true);
            setUploadProgress(0);

            // Validate file
            validateFile(file, { allowedTypes, maxSize });

            // Upload to CDN
            const cdnUrl = await uploadToCDN(file, folder);

            setUploadProgress(100);
            toast.success('File uploaded successfully!');

            return cdnUrl;
        } catch (error) {
            console.error('Upload error:', error);
            toast.error(error.message || 'Failed to upload file');
            throw error;
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const handleFileSelect = async (event, onSuccess) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const cdnUrl = await uploadFile(file);
            if (onSuccess) {
                onSuccess(cdnUrl, file.name);
            }
        } catch (error) {
            // Error already handled in uploadFile
        }
    };

    return {
        uploadFile,
        handleFileSelect,
        isUploading,
        uploadProgress
    };
};
