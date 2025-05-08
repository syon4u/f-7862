import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { toast } from 'sonner';

type BannerRow = Database['public']['Tables']['banners']['Row'];

export interface BannerImage {
  id: string;
  url: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  category: string;
  isActive: boolean;
  altText?: string; // Add altText property
}

interface BannerContextType {
  banners: BannerImage[];
  addBanner: (banner: Omit<BannerImage, 'id' | 'isActive'>) => Promise<void>;
  updateBanner: (id: string, banner: BannerImage) => Promise<void>;
  deleteBanner: (id: string) => Promise<void>;
  setActiveBanner: (id: string) => Promise<void>;
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

  // Load banners from Supabase on mount
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      const formattedBanners: BannerImage[] = data.map(banner => ({
        id: banner.id,
        url: banner.url,
        title: banner.title,
        subtitle: banner.subtitle || undefined,
        buttonText: banner.button_text || undefined,
        buttonLink: banner.button_link || undefined,
        category: banner.category,
        isActive: banner.is_active || false,
        altText: banner.alt_text || undefined, // Map alt_text from database to altText in our interface
      }));

      setBanners(formattedBanners);
    } catch (error) {
      console.error('Error fetching banners:', error);
      toast.error('Failed to load banners');
    } finally {
      setLoading(false);
    }
  };

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

  const addBanner = async (banner: Omit<BannerImage, 'id' | 'isActive'>) => {
    try {
      const { data, error } = await supabase
        .from('banners')
        .insert([{
          title: banner.title,
          subtitle: banner.subtitle,
          url: banner.url,
          button_text: banner.buttonText,
          button_link: banner.buttonLink,
          category: banner.category,
          is_active: false,
          alt_text: banner.altText // Map altText to alt_text in the database
        }])
        .select()
        .single();

      if (error) throw error;

      const newBanner: BannerImage = {
        id: data.id,
        url: data.url,
        title: data.title,
        subtitle: data.subtitle || undefined,
        buttonText: data.button_text || undefined,
        buttonLink: data.button_link || undefined,
        category: data.category,
        isActive: data.is_active || false,
        altText: data.alt_text || undefined,
      };

      setBanners(prev => [...prev, newBanner]);
      toast.success('Banner added successfully');
    } catch (error) {
      console.error('Error adding banner:', error);
      toast.error('Failed to add banner');
    }
  };

  const updateBanner = async (id: string, banner: BannerImage) => {
    try {
      const { error } = await supabase
        .from('banners')
        .update({
          title: banner.title,
          subtitle: banner.subtitle,
          url: banner.url,
          button_text: banner.buttonText,
          button_link: banner.buttonLink,
          category: banner.category,
          is_active: banner.isActive,
          alt_text: banner.altText // Map altText to alt_text
        })
        .eq('id', id);

      if (error) throw error;

      setBanners(prev => prev.map(b => b.id === id ? banner : b));
      toast.success('Banner updated successfully');
    } catch (error) {
      console.error('Error updating banner:', error);
      toast.error('Failed to update banner');
    }
  };

  const deleteBanner = async (id: string) => {
    try {
      const { error } = await supabase
        .from('banners')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setBanners(prev => prev.filter(banner => banner.id !== id));
      toast.success('Banner deleted successfully');
    } catch (error) {
      console.error('Error deleting banner:', error);
      toast.error('Failed to delete banner');
    }
  };

  const setActiveBanner = async (id: string) => {
    try {
      // First, deactivate all banners in the same category
      const bannerToActivate = banners.find(b => b.id === id);
      if (!bannerToActivate) throw new Error('Banner not found');

      const { error: updateError } = await supabase
        .from('banners')
        .update({ is_active: false })
        .eq('category', bannerToActivate.category);

      if (updateError) throw updateError;

      // Then activate the selected banner
      const { error: activateError } = await supabase
        .from('banners')
        .update({ is_active: true })
        .eq('id', id);

      if (activateError) throw activateError;

      setBanners(prev => prev.map(banner => ({
        ...banner,
        isActive: banner.id === id
      })));

      toast.success('Banner set as active');
    } catch (error) {
      console.error('Error setting active banner:', error);
      toast.error('Failed to set active banner');
    }
  };

  return (
    <BannerContext.Provider value={{ banners, addBanner, updateBanner, deleteBanner, setActiveBanner, loading }}>
      {children}
    </BannerContext.Provider>
  );
}
