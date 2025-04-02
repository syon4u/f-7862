
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface BannerImage {
  id: string;
  url: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  isActive: boolean;
}

interface BannerContextType {
  banners: BannerImage[];
  addBanner: (banner: BannerImage) => void;
  updateBanner: (id: string, banner: BannerImage) => void;
  deleteBanner: (id: string) => void;
  setActiveBanner: (id: string) => void;
  loading: boolean;
}

const BannerContext = createContext<BannerContextType | undefined>(undefined);

export function useBanners() {
  const context = useContext(BannerContext);
  if (context === undefined) {
    throw new Error('useBanners must be used within a BannerProvider');
  }
  return context;
}

interface BannerProviderProps {
  children: ReactNode;
}

export function BannerProvider({ children }: BannerProviderProps) {
  const [banners, setBanners] = useState<BannerImage[]>([]);
  const [loading, setLoading] = useState(true);

  // Load initial banners from localStorage on mount
  useEffect(() => {
    const storedBanners = localStorage.getItem('site-banners');
    if (storedBanners) {
      try {
        setBanners(JSON.parse(storedBanners));
      } catch (error) {
        console.error('Failed to parse banners from localStorage:', error);
        // Initialize with a default banner if parsing fails
        setBanners([{
          id: '1',
          url: 'https://images.unsplash.com/photo-1560506840-ec148e82a604?q=80&w=1000',
          title: 'Spring Wardrobe Refresh!',
          buttonText: 'SHOP NEW IN',
          buttonLink: '/shop-now',
          isActive: true
        }]);
      }
    } else {
      // Initialize with a default banner if none exists
      setBanners([{
        id: '1',
        url: 'https://images.unsplash.com/photo-1560506840-ec148e82a604?q=80&w=1000',
        title: 'Spring Wardrobe Refresh!',
        buttonText: 'SHOP NEW IN',
        buttonLink: '/shop-now',
        isActive: true
      }]);
    }
    setLoading(false);
  }, []);

  // Save banners to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('site-banners', JSON.stringify(banners));
    }
  }, [banners, loading]);

  const addBanner = (banner: BannerImage) => {
    setBanners(prev => [...prev, banner]);
  };

  const updateBanner = (id: string, updatedBanner: BannerImage) => {
    setBanners(prev => 
      prev.map(banner => banner.id === id ? updatedBanner : banner)
    );
  };

  const deleteBanner = (id: string) => {
    setBanners(prev => prev.filter(banner => banner.id !== id));
  };

  const setActiveBanner = (id: string) => {
    setBanners(prev => 
      prev.map(banner => ({
        ...banner,
        isActive: banner.id === id
      }))
    );
  };

  return (
    <BannerContext.Provider value={{ banners, addBanner, updateBanner, deleteBanner, setActiveBanner, loading }}>
      {children}
    </BannerContext.Provider>
  );
}
