
import { useState, useEffect } from 'react';
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

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addBlogPost = async (postData: Partial<BlogPost>) => {
    try {
      // Ensure required fields are present
      if (!postData.title || !postData.content) {
        throw new Error('Title and content are required');
      }

      const slug = await generateSlug(postData.title);
      const readingTime = calculateReadingTime(postData.content);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .insert({
          title: postData.title,
          content: postData.content,
          excerpt: postData.excerpt || null,
          slug,
          author_id: postData.author_id || null,
          featured_image_url: postData.featured_image_url || null,
          is_published: postData.is_published || false,
          is_featured: postData.is_featured || false,
          reading_time: readingTime,
          tags: postData.tags || null,
          meta_description: postData.meta_description || null,
          published_at: postData.is_published ? new Date().toISOString() : null
        })
        .select()
        .single();

      if (error) throw error;
      
      if (data.is_published) {
        setBlogPosts(prev => [data, ...prev]);
      }
      
      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error adding blog post:', error);
      toast({
        title: "Error",
        description: "Failed to create blog post",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateBlogPost = async (id: string, postData: Partial<BlogPost>) => {
    try {
      const readingTime = postData.content ? calculateReadingTime(postData.content) : undefined;
      
      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          ...postData,
          reading_time: readingTime,
          published_at: postData.is_published ? new Date().toISOString() : null
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setBlogPosts(prev => prev.map(post => post.id === id ? data : post));
      
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error updating blog post:', error);
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setBlogPosts(prev => prev.filter(post => post.id !== id));
      
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
      throw error;
    }
  };

  const generateSlug = async (title: string): Promise<string> => {
    const { data, error } = await supabase
      .rpc('generate_blog_slug', { title });
    
    if (error) {
      console.error('Error generating slug:', error);
      return title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    }
    
    return data;
  };

  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return {
    blogPosts,
    isLoading,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    refetch: fetchBlogPosts
  };
};
