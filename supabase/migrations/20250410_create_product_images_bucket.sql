
-- Create a bucket for product images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
SELECT 'product-images', 'product-images', true
WHERE NOT EXISTS (
  SELECT 1 FROM storage.buckets WHERE id = 'product-images'
);

-- Create public access policies for product-images bucket
-- Allow anonymous uploads
CREATE POLICY IF NOT EXISTS "Anyone can upload product images" 
ON storage.objects 
FOR INSERT 
TO public
WITH CHECK (bucket_id = 'product-images');

-- Allow anonymous selection
CREATE POLICY IF NOT EXISTS "Anyone can view product images" 
ON storage.objects 
FOR SELECT 
TO public
USING (bucket_id = 'product-images');

-- Allow anonymous updates
CREATE POLICY IF NOT EXISTS "Anyone can update product images" 
ON storage.objects 
FOR UPDATE 
TO public
USING (bucket_id = 'product-images');

-- Allow anonymous deletes
CREATE POLICY IF NOT EXISTS "Anyone can delete product images" 
ON storage.objects 
FOR DELETE 
TO public
USING (bucket_id = 'product-images');
