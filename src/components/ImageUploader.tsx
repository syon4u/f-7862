
import React, { useState } from 'react';
import { Upload, X, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { uploadProductImage } from '@/utils/imageUpload';
import { toast } from '@/components/ui/use-toast';

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploaded, className }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file (PNG, JPG, etc.)');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size should be less than 5MB');
      return;
    }
    
    setUploadError(null);
    setIsUploading(true);
    
    try {
      const imageUrl = await uploadProductImage(file);
      onImageUploaded(imageUrl);
      toast({
        title: "Image uploaded successfully",
        description: "Your image has been uploaded and added to the product.",
        action: (
          <div className="flex items-center space-x-1">
            <Check className="h-4 w-4 text-green-600" />
          </div>
        ),
      });
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadError('Failed to upload image. Please try again.');
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your image.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset the input
      e.target.value = '';
    }
  };
  
  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        <label 
          htmlFor="image-upload" 
          className={`
            flex flex-col items-center justify-center w-full h-32 
            border-2 border-dashed rounded-lg cursor-pointer 
            ${isUploading ? 'bg-gray-100 border-gray-300' : 'hover:bg-gray-50 border-gray-300 hover:border-primary'}
            transition-colors duration-200
          `}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-6 h-6 mb-2 text-gray-500" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
          </div>
          <input 
            id="image-upload" 
            type="file" 
            className="hidden" 
            onChange={handleFileChange}
            accept="image/*"
            disabled={isUploading}
          />
        </label>
        
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      {uploadError && (
        <div className="mt-2 flex items-center text-sm text-red-600">
          <AlertCircle className="h-4 w-4 mr-1" />
          <span>{uploadError}</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
