
import React, { useRef, useState } from 'react';
import { Image, Trash, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BannerImage, useBanners } from '@/contexts/BannerContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const AddNewBanner: React.FC = () => {
  const { addBanner } = useBanners();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [newBanner, setNewBanner] = useState<Partial<BannerImage>>({
    title: '',
    url: '',
    buttonText: 'SHOP NOW',
    buttonLink: '/shop-now',
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('banner-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('banner-images')
        .getPublicUrl(filePath);

      setNewBanner(prev => ({
        ...prev,
        url: publicUrl
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }

    e.target.value = '';
  };

  const handleAddBanner = async () => {
    if (!newBanner.url) {
      toast.error("Please upload an image for the banner");
      return;
    }
    
    if (!newBanner.title) {
      toast.error("Please add a title for the banner");
      return;
    }
    
    try {
      await addBanner({
        url: newBanner.url,
        title: newBanner.title,
        subtitle: newBanner.subtitle,
        buttonText: newBanner.buttonText,
        buttonLink: newBanner.buttonLink,
        category: 'general'
      });

      setNewBanner({
        title: '',
        url: '',
        buttonText: 'SHOP NOW',
        buttonLink: '/shop-now',
      });
      
      toast.success("Banner added successfully");
    } catch (error) {
      console.error('Error adding banner:', error);
      toast.error('Failed to add banner');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Banner</CardTitle>
        <CardDescription>
          Upload a new banner image for the homepage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="banner-image">Banner Image</label>
            {newBanner.url ? (
              <div className="relative">
                <img 
                  src={newBanner.url} 
                  alt="Banner preview" 
                  className="w-full h-40 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setNewBanner({ ...newBanner, url: '' })}
                  className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-md border-gray-300">
                <div className="text-center">
                  <Image className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Upload a banner image</p>
                  <input
                    ref={fileInputRef}
                    id="banner-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" /> Upload
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Banner Title</label>
              <Input
                value={newBanner.title || ''}
                onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                placeholder="e.g., Spring Collection"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Subtitle (Optional)</label>
              <Input
                value={newBanner.subtitle || ''}
                onChange={(e) => setNewBanner({ ...newBanner, subtitle: e.target.value })}
                placeholder="e.g., Discover our new arrivals"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Button Text</label>
              <Input
                value={newBanner.buttonText || ''}
                onChange={(e) => setNewBanner({ ...newBanner, buttonText: e.target.value })}
                placeholder="e.g., SHOP NOW"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Button Link</label>
              <Input
                value={newBanner.buttonLink || ''}
                onChange={(e) => setNewBanner({ ...newBanner, buttonLink: e.target.value })}
                placeholder="e.g., /shop-now"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button onClick={handleAddBanner}>Add Banner</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddNewBanner;
