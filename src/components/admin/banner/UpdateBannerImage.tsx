
import React, { useRef, useState } from 'react';
import { Upload, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BannerImage, useBanners } from '@/contexts/BannerContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { withErrorHandling } from '@/utils/errorHandling';
import { compressImage } from '@/utils/imageOptimization';

interface UpdateBannerImageProps {
  selectedBannerId: string;
  setSelectedBannerId: (id: string) => void;
}

const UpdateBannerImage: React.FC<UpdateBannerImageProps> = ({ selectedBannerId, setSelectedBannerId }) => {
  const { banners, updateBanner } = useBanners();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [altText, setAltText] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      // Compress the image before uploading
      const compressedFile = await compressImage(file);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('banner-images')
        .upload(filePath, compressedFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('banner-images')
        .getPublicUrl(filePath);

      const bannerToUpdate = banners.find(b => b.id === selectedBannerId);
      if (bannerToUpdate) {
        await updateBanner(selectedBannerId, {
          ...bannerToUpdate,
          url: publicUrl,
          alt_text: altText || bannerToUpdate.title // Use alt text or fall back to title
        });
        toast.success("Banner image updated successfully");
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
      // Reset the input
      e.target.value = '';
    }
  };

  const selectedBanner = banners.find(b => b.id === selectedBannerId);
  
  // When a new banner is selected, update the alt text field
  React.useEffect(() => {
    if (selectedBanner) {
      setAltText(selectedBanner.alt_text || selectedBanner.title || '');
    }
  }, [selectedBannerId, selectedBanner]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Existing Banner</CardTitle>
        <CardDescription>
          Select a banner to update its image
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select 
            value={selectedBannerId} 
            onValueChange={setSelectedBannerId}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a banner to update" />
            </SelectTrigger>
            <SelectContent>
              {banners.map((banner) => (
                <SelectItem key={banner.id} value={banner.id}>
                  {banner.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedBannerId && (
            <div className="space-y-4">
              <div className="relative">
                <img 
                  src={selectedBanner?.url} 
                  alt={selectedBanner?.alt_text || selectedBanner?.title || 'Banner image'} 
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="alt-text">Image Alt Text (for accessibility)</Label>
                <Input 
                  id="alt-text"
                  placeholder="Describe the image content" 
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                />
                {!altText && (
                  <div className="flex items-center gap-2 text-amber-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>Adding alt text improves accessibility for screen readers</span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1"
                  disabled={isUploading}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {isUploading ? 'Uploading...' : 'Upload New Image'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  {showPreview ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </Button>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                ref={fileInputRef}
              />

              {showPreview && selectedBanner && (
                <div className="mt-6 border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-1">Banner Preview</h3>
                  <div className="relative h-64 overflow-hidden rounded-md bg-muted">
                    <div 
                      className="absolute inset-0 bg-cover bg-center" 
                      style={{ backgroundImage: `url(${selectedBanner.url})` }}
                      role="img"
                      aria-label={altText || selectedBanner.title || 'Banner image'}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white p-6">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">{selectedBanner.title}</h2>
                        {selectedBanner.subtitle && (
                          <p className="mb-4 text-sm md:text-base">{selectedBanner.subtitle}</p>
                        )}
                        <button className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-opacity-90">
                          {selectedBanner.button_text || 'SHOP NOW'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateBannerImage;
