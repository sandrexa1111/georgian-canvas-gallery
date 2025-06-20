
import { useState } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { uploadBlogImage, validateImageFile } from '@/utils/imageUpload';
import { useToast } from '@/hooks/use-toast';

interface SimpleImageUploadProps {
  currentImageUrl?: string;
  onImageUpload: (url: string) => void;
  onImageRemove: () => void;
  disabled?: boolean;
}

export const SimpleImageUpload = ({ 
  currentImageUrl, 
  onImageUpload, 
  onImageRemove, 
  disabled 
}: SimpleImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      toast({
        title: "Invalid file",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await uploadBlogImage(file);
      onImageUpload(imageUrl);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">Featured Image</label>
      
      {currentImageUrl ? (
        <div className="relative">
          <img
            src={currentImageUrl}
            alt="Featured image"
            className="w-full h-48 object-cover rounded-lg border"
          />
          <button
            type="button"
            onClick={onImageRemove}
            disabled={disabled}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
          <Image className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, WebP up to 5MB
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <label className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="sr-only"
            disabled={disabled || isUploading}
          />
          <div className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent transition-colors disabled:opacity-50">
            <Upload size={16} />
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </div>
        </label>
      </div>
    </div>
  );
};
