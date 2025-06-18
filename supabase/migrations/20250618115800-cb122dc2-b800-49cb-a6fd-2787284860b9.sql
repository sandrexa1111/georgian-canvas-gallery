
-- Create a storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true);

-- Create policy to allow anyone to view blog images (public bucket)
CREATE POLICY "Public blog images access" ON storage.objects
FOR SELECT USING (bucket_id = 'blog-images');

-- Create policy to allow authenticated users to upload blog images
CREATE POLICY "Authenticated users can upload blog images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'blog-images' AND 
  auth.role() = 'authenticated'
);

-- Create policy to allow authenticated users to update their uploaded blog images
CREATE POLICY "Authenticated users can update blog images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'blog-images' AND 
  auth.role() = 'authenticated'
);

-- Create policy to allow authenticated users to delete blog images
CREATE POLICY "Authenticated users can delete blog images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'blog-images' AND 
  auth.role() = 'authenticated'
);
