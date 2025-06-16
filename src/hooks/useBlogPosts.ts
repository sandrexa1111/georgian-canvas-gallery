
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  slug: string;
  author_id: string | null;
  featured_image_url: string | null;
  is_published: boolean | null;
  is_featured: boolean | null;
  published_at: string | null;
  reading_time: number | null;
  tags: string[] | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchBlogPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('Fetching blog posts...');
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
      }

      console.log('Blog posts fetched:', data?.length || 0);
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error in fetchBlogPosts:', error);
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive",
      });
      setBlogPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const generateSlug = async (title: string): Promise<string> => {
    try {
      console.log('Generating slug for title:', title);
      const { data, error } = await supabase
        .rpc('generate_blog_slug', { title });
      
      if (error) {
        console.error('Error generating slug:', error);
        throw error;
      }
      
      console.log('Generated slug:', data);
      return data;
    } catch (error) {
      console.error('Slug generation failed, using fallback:', error);
      // Fallback slug generation
      return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    }
  };

  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0)
      .length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const addBlogPost = useCallback(async (postData: Partial<BlogPost>) => {
    try {
      console.log('Adding blog post:', postData.title);
      
      // Validate required fields
      if (!postData.title?.trim() || !postData.content?.trim()) {
        throw new Error('Title and content are required');
      }

      // Generate slug and calculate reading time
      const slug = await generateSlug(postData.title);
      const readingTime = calculateReadingTime(postData.content);
      
      const insertData = {
        title: postData.title.trim(),
        content: postData.content.trim(),
        excerpt: postData.excerpt?.trim() || null,
        slug,
        author_id: postData.author_id || null,
        featured_image_url: postData.featured_image_url?.trim() || null,
        is_published: postData.is_published || false,
        is_featured: postData.is_featured || false,
        reading_time: readingTime,
        tags: postData.tags || null,
        meta_description: postData.meta_description?.trim() || null,
        published_at: postData.is_published ? new Date().toISOString() : null
      };

      console.log('Inserting blog post data:', insertData);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error('Error inserting blog post:', error);
        throw error;
      }
      
      console.log('Blog post created successfully:', data);
      
      // Only update local state if published
      if (data.is_published) {
        setBlogPosts(prev => [data, ...prev]);
      }
      
      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error in addBlogPost:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create blog post",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const updateBlogPost = useCallback(async (id: string, postData: Partial<BlogPost>) => {
    try {
      console.log('Updating blog post:', id);
      
      const updateData: any = { ...postData };
      
      // Calculate reading time if content changed
      if (postData.content) {
        updateData.reading_time = calculateReadingTime(postData.content);
      }
      
      // Set published_at based on is_published status
      if (postData.hasOwnProperty('is_published')) {
        updateData.published_at = postData.is_published ? new Date().toISOString() : null;
      }
      
      const { data, error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating blog post:', error);
        throw error;
      }
      
      console.log('Blog post updated successfully:', data);
      
      // Update local state
      setBlogPosts(prev => prev.map(post => post.id === id ? data : post));
      
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error in updateBlogPost:', error);
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const deleteBlogPost = useCallback(async (id: string) => {
    try {
      console.log('Deleting blog post:', id);
      
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting blog post:', error);
        throw error;
      }
      
      console.log('Blog post deleted successfully');
      
      // Update local state immediately
      setBlogPosts(prev => prev.filter(post => post.id !== id));
      
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
    } catch (error) {
      console.error('Error in deleteBlogPost:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  useEffect(() => {
    fetchBlogPosts();
  }, [fetchBlogPosts]);

  return {
    blogPosts,
    isLoading,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    refetch: fetchBlogPosts
  };
};
