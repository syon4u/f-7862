import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BannerImage, useBanners } from '@/contexts/BannerContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface UpdateBannerImageProps {
  selectedBannerId: string;
  setSelectedBannerId: (id: string) => void;
}

const UpdateBannerImage: React.FC<UpdateBannerImageProps> = ({ selectedBannerId, setSelectedBannerId }) => {
  const { banners, updateBanner } = useBanners();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('banner-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('banner-images')
        .getPublicUrl(filePath);

      const bannerToUpdate = banners.find(b => b.id === selectedBannerId);
      if (bannerToUpdate) {
        await updateBanner(selectedBannerId, {
          ...bannerToUpdate,
          url: publicUrl
        });
        toast.success("Banner image updated successfully");
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }

    // Reset the input
    e.target.value = '';
  };

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
                  src={banners.find(b => b.id === selectedBannerId)?.url} 
                  alt="Selected banner" 
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload New Image
              </Button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                ref={fileInputRef}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateBannerImage;
