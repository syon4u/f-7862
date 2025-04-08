
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
