
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useBanners } from '@/contexts/BannerContext';
import { toast } from 'sonner';

const BannerList: React.FC = () => {
  const { banners, deleteBanner, setActiveBanner } = useBanners();

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

  return (
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
  );
};

export default BannerList;
