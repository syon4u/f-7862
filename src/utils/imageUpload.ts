
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

/**
 * Upload an image to Supabase Storage
 * @param file File to upload
 * @returns URL of the uploaded image
 */
export const uploadProductImage = async (file: File): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;
    
    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true // Allow overwriting existing files
      });

    if (error) {
      console.error('Error uploading image:', error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error in upload function:', error);
    throw error;
  }
};

/**
 * Get a list of images from Supabase Storage
 * @returns Array of image URLs
 */
export const getProductImages = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase.storage
      .from('product-images')
      .list();

    if (error) {
      console.error('Error listing images:', error);
      throw new Error(`Failed to list images: ${error.message}`);
    }

    // Convert to public URLs
    return data.map(file => {
      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(file.name);
      
      return urlData.publicUrl;
    });
  } catch (error) {
    console.error('Error in listing images:', error);
    throw error;
  }
};

/**
 * Add external image URL to Supabase Storage
 * @param imageUrl URL of the image to add
 * @returns URL of the image in Supabase Storage
 */
export const addExternalImageToStorage = async (imageUrl: string): Promise<string> => {
  try {
    // Extract the image name from URL or create a unique name
    const fileName = `${uuidv4()}.jpg`;
    
    // Fetch the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    
    const blob = await response.blob();
    
    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, blob, {
        cacheControl: '3600',
        upsert: true
      });
      
    if (error) {
      console.error('Error uploading external image:', error);
      throw new Error(`Failed to upload external image: ${error.message}`);
    }
    
    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);
      
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error adding external image:', error);
    throw error;
  }
};
