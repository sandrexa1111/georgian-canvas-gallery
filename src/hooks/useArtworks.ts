
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Artwork {
  id: string;
  title: string;
  description: string;
  image_url: string;
  dimensions: string;
  medium: string;
  year_created: number;
  price?: number;
  category_id: string;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

export const useArtworks = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchArtworks = async () => {
    try {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArtworks(data || []);
    } catch (error) {
      console.error('Error fetching artworks:', error);
      toast({
        title: "Error",
        description: "Failed to fetch artworks",
        variant: "destructive",
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Error",
        description: "Failed to fetch categories",
        variant: "destructive",
      });
    }
  };

  const addArtwork = async (artworkData: Omit<Artwork, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('artworks')
        .insert([artworkData])
        .select()
        .single();

      if (error) throw error;
      
      setArtworks(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Artwork added successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error adding artwork:', error);
      toast({
        title: "Error",
        description: "Failed to add artwork",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateArtwork = async (id: string, artworkData: Partial<Artwork>) => {
    try {
      const { data, error } = await supabase
        .from('artworks')
        .update({ ...artworkData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setArtworks(prev => prev.map(artwork => 
        artwork.id === id ? data : artwork
      ));
      
      toast({
        title: "Success",
        description: "Artwork updated successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error updating artwork:', error);
      toast({
        title: "Error",
        description: "Failed to update artwork",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteArtwork = async (id: string) => {
    try {
      const { error } = await supabase
        .from('artworks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setArtworks(prev => prev.filter(artwork => artwork.id !== id));
      toast({
        title: "Success",
        description: "Artwork deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting artwork:', error);
      toast({
        title: "Error",
        description: "Failed to delete artwork",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchArtworks(), fetchCategories()]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  return {
    artworks,
    categories,
    isLoading,
    addArtwork,
    updateArtwork,
    deleteArtwork,
    fetchArtworks,
    fetchCategories,
  };
};
