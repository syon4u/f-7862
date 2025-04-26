import React, { useState, useRef } from 'react';
import { Upload, Trash, Image, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useBanners, BannerImage } from '@/contexts/BannerContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

const BannerManager: React.FC = () => {
  const { banners, addBanner, deleteBanner, setActiveBanner, updateBanner } = useBanners();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedBannerId, setSelectedBannerId] = useState<string>('');
  
  const [newBanner, setNewBanner] = useState<Partial<BannerImage>>({
    title: '',
    url: '',
    buttonText: 'SHOP NOW',
    buttonLink: '/shop-now',
  });

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('banner-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('banner-images')
      .getPublicUrl(filePath);

    return publicUrl;
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
    } catch (error) {
      console.error('Error adding banner:', error);
      toast.error('Failed to add banner');
    }
  };

  const handleDeleteBanner = (id: string) => {
    const activeBanner = banners.find(banner => banner.isActive);
    if (activeBanner && activeBanner.id === id) {
      toast.error("Cannot delete the active banner. Please set another banner as active first.");
      return;
    }
    
    deleteBanner(id);
    toast.success("Banner deleted successfully");
  };

  const handleSetActive = (id: string) => {
    setActiveBanner(id);
    toast.success("Banner set as active");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isUpdate: boolean = false) => {
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
      const imageUrl = await uploadImage(file);

      if (isUpdate && selectedBannerId) {
        const bannerToUpdate = banners.find(b => b.id === selectedBannerId);
        if (bannerToUpdate) {
          await updateBanner(selectedBannerId, {
            ...bannerToUpdate,
            url: imageUrl
          });
        }
      } else {
        setNewBanner(prev => ({
          ...prev,
          url: imageUrl
        }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }

    // Reset the input
    e.target.value = '';
  };

  const handleUpdateBannerImage = () => {
    fileInputRef.current?.click();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-8">
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
                  onClick={() => handleImageUpload}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New Image
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, true)}
                  ref={fileInputRef}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

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
                      onClick={triggerFileInput}
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

      <Card>
        <CardHeader>
          <CardTitle>Manage Banners</CardTitle>
          <CardDescription>
            Manage existing homepage banners
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {banners.length === 0 ? (
              <div className="text-center p-4 border rounded-md bg-muted/30">
                <p>No banners added yet</p>
              </div>
            ) : (
              banners.map((banner) => (
                <div key={banner.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-md">
                  <div className="w-full md:w-1/3">
                    <img 
                      src={banner.url} 
                      alt={banner.title} 
                      className="w-full h-32 object-cover rounded-md" 
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-medium">{banner.title}</h3>
                    {banner.subtitle && <p className="text-sm text-muted-foreground">{banner.subtitle}</p>}
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Button:</span>
                      <span>{banner.buttonText || 'SHOP NOW'}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="text-primary">{banner.buttonLink || '/shop-now'}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <Button
                        size="sm"
                        variant={banner.isActive ? "default" : "outline"}
                        onClick={() => handleSetActive(banner.id)}
                        disabled={banner.isActive}
                      >
                        {banner.isActive ? "Active" : "Set Active"}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteBanner(banner.id)}
                        disabled={banner.isActive}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BannerManager;
