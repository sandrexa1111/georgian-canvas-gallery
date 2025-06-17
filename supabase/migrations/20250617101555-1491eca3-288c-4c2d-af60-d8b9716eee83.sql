
-- Create artwork_comments table for storing user comments on artworks
CREATE TABLE public.artwork_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  artwork_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  comment_text TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  is_approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.artwork_comments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read approved comments
CREATE POLICY "Anyone can view approved comments" 
  ON public.artwork_comments 
  FOR SELECT 
  USING (is_approved = true);

-- Create policy to allow anyone to insert comments (they will be pending approval)
CREATE POLICY "Anyone can create comments" 
  ON public.artwork_comments 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow admins to update comments (for approval/moderation)
CREATE POLICY "Admins can update comments" 
  ON public.artwork_comments 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Create policy to allow admins to delete comments
CREATE POLICY "Admins can delete comments" 
  ON public.artwork_comments 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Create index for better performance when querying by artwork_id
CREATE INDEX idx_artwork_comments_artwork_id ON public.artwork_comments(artwork_id);

-- Create index for better performance when querying approved comments
CREATE INDEX idx_artwork_comments_approved ON public.artwork_comments(is_approved);
