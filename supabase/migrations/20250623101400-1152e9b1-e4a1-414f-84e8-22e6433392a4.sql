
-- Fix RLS policies for artwork_comments to allow anonymous users to insert comments
DROP POLICY IF EXISTS "Allow anonymous comment insertion" ON public.artwork_comments;
DROP POLICY IF EXISTS "Allow public comment viewing" ON public.artwork_comments;

-- Allow anyone to insert comments (they'll be moderated)
CREATE POLICY "Allow anonymous comment insertion" 
ON public.artwork_comments 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to view approved comments
CREATE POLICY "Allow public comment viewing" 
ON public.artwork_comments 
FOR SELECT 
USING (is_approved = true);

-- Allow admins to manage all comments
CREATE POLICY "Allow admin comment management" 
ON public.artwork_comments 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Enable RLS on artwork_comments table
ALTER TABLE public.artwork_comments ENABLE ROW LEVEL SECURITY;
