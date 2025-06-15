
-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Anyone can view published artworks" ON public.artworks;
DROP POLICY IF EXISTS "Admins can manage all artworks" ON public.artworks;
DROP POLICY IF EXISTS "Full access for admin operations" ON public.artworks;
DROP POLICY IF EXISTS "Anyone can view categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;
DROP POLICY IF EXISTS "Full access for admin operations on categories" ON public.categories;

-- Enable RLS on both tables
ALTER TABLE public.artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Create new RLS policies for artworks table
-- Allow everyone to view published artworks
CREATE POLICY "Anyone can view published artworks" 
  ON public.artworks 
  FOR SELECT 
  USING (is_published = true);

-- Allow admins to do everything with artworks
CREATE POLICY "Admins can manage all artworks" 
  ON public.artworks 
  FOR ALL 
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create new RLS policies for categories table
-- Allow everyone to view categories
CREATE POLICY "Anyone can view categories" 
  ON public.categories 
  FOR SELECT 
  USING (true);

-- Allow admins to manage categories
CREATE POLICY "Admins can manage categories" 
  ON public.categories 
  FOR ALL 
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
