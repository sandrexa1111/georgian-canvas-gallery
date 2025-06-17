
-- Add the new "Abstract" category
INSERT INTO public.categories (name, description) 
VALUES ('Abstract', 'Abstract art pieces that emphasize form, color, and composition over realistic representation');

-- Remove the "Portraits" category if it exists
DELETE FROM public.categories 
WHERE name = 'Portraits';

-- Update any artworks that might be using the "Portraits" category to use a different category
-- First, let's get the Abstract category ID for the update
UPDATE public.artworks 
SET category_id = (SELECT id FROM public.categories WHERE name = 'Abstract' LIMIT 1)
WHERE category_id IN (SELECT id FROM public.categories WHERE name = 'Portraits');
