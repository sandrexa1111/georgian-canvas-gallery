
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Plus, Edit, Trash2, BookOpen, Image, AlertCircle, RefreshCw } from 'lucide-react';
import { ArtworkForm } from './ArtworkForm';
import { BlogForm } from './BlogForm';
import { useArtworks, type Artwork } from '@/hooks/useArtworks';
import { useBlogPosts, type BlogPost } from '@/hooks/useBlogPosts';

interface AdminPanelProps {
  onLogout: () => void;
}

export const AdminPanel = ({ onLogout }: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState<'artworks' | 'blog'>('artworks');
  const [isArtworkFormOpen, setIsArtworkFormOpen] = useState(false);
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);

  // Only load data for the active tab to improve performance
  const shouldLoadArtworks = activeTab === 'artworks';
  const shouldLoadBlog = activeTab === 'blog';

  console.log('AdminPanel render - activeTab:', activeTab, 'shouldLoadArtworks:', shouldLoadArtworks, 'shouldLoadBlog:', shouldLoadBlog);

  const artworkHook = useArtworks();
  const blogHook = useBlogPosts();

  // Extract values with fallbacks
  const artworks = shouldLoadArtworks ? (artworkHook.artworks || []) : [];
  const categories = shouldLoadArtworks ? (artworkHook.categories || []) : [];
  const artworksLoading = shouldLoadArtworks ? artworkHook.isLoading : false;
  const artworksError = shouldLoadArtworks ? artworkHook.error : null;

  const blogPosts = shouldLoadBlog ? (blogHook.blogPosts || []) : [];
  const blogLoading = shouldLoadBlog ? blogHook.isLoading : false;
  const blogError = shouldLoadBlog ? blogHook.error : null;

  useEffect(() => {
    console.log('AdminPanel mounted, active tab:', activeTab);
  }, []);

  useEffect(() => {
    console.log('Tab changed to:', activeTab);
  }, [activeTab]);

  const handleLogout = async () => {
    console.log('Logout button clicked');
    try {
      localStorage.removeItem('gallery_admin_auth');
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleAddArtwork = async (artworkData: any) => {
    try {
      console.log('Adding artwork:', artworkData.title);
      await artworkHook.addArtwork(artworkData);
      setIsArtworkFormOpen(false);
      console.log('Artwork added successfully');
    } catch (error) {
      console.error('Failed to add artwork:', error);
    }
  };

  const handleEditArtwork = async (artworkData: any) => {
    if (!editingArtwork) return;
    
    try {
      console.log('Updating artwork:', editingArtwork.id);
      await artworkHook.updateArtwork(editingArtwork.id, artworkData);
      setEditingArtwork(null);
      console.log('Artwork updated successfully');
    } catch (error) {
      console.error('Failed to update artwork:', error);
    }
  };

  const handleDeleteArtwork = async (id: string) => {
    if (confirm('Are you sure you want to delete this artwork?')) {
      try {
        console.log('Deleting artwork:', id);
        await artworkHook.deleteArtwork(id);
        console.log('Artwork deleted successfully');
      } catch (error) {
        console.error('Failed to delete artwork:', error);
      }
    }
  };

  const handleAddBlogPost = async (postData: any) => {
    try {
      console.log('Adding blog post:', postData.title);
      await blogHook.addBlogPost(postData);
      setIsBlogFormOpen(false);
      console.log('Blog post added successfully');
    } catch (error) {
      console.error('Failed to add blog post:', error);
    }
  };

  const handleEditBlogPost = async (postData: any) => {
    if (!editingBlogPost) return;
    
    try {
      console.log('Updating blog post:', editingBlogPost.id);
      await blogHook.updateBlogPost(editingBlogPost.id, postData);
      setEditingBlogPost(null);
      console.log('Blog post updated successfully');
    } catch (error) {
      console.error('Failed to update blog post:', error);
    }
  };

  const handleDeleteBlogPost = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        console.log('Deleting blog post:', id);
        await blogHook.deleteBlogPost(id);
        console.log('Blog post deleted successfully');
      } catch (error) {
        console.error('Failed to delete blog post:', error);
      }
    }
  };

  const handleRefresh = () => {
    console.log('Refresh button clicked for tab:', activeTab);
    if (activeTab === 'artworks' && artworkHook.refetch) {
      artworkHook.refetch();
    } else if (activeTab === 'blog' && blogHook.refetch) {
      blogHook.refetch();
    }
  };

  const isLoading = artworksLoading || blogLoading;
  const hasError = artworksError || blogError;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="font-playfair text-xl font-bold">Gallery Admin Panel</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                disabled={isLoading}
              >
                <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('artworks')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'artworks'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Image size={16} />
              Artworks ({artworks.length})
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'blog'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <BookOpen size={16} />
              Blog Posts ({blogPosts.length})
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        {hasError && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle size={20} />
              <span className="font-medium">Error loading data</span>
            </div>
            <p className="text-sm text-destructive/80 mt-1">
              {artworksError || blogError || 'An unexpected error occurred'}
            </p>
            <button
              onClick={handleRefresh}
              className="mt-2 px-3 py-1 text-sm bg-destructive text-destructive-foreground rounded hover:bg-destructive/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading {activeTab}...</p>
          </div>
        )}

        {/* Content */}
        {!isLoading && !hasError && (
          <>
            {activeTab === 'artworks' && (
              <>
                {/* Add New Artwork Button */}
                <div className="mb-8">
                  <button
                    onClick={() => setIsArtworkFormOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    <Plus size={20} />
                    Add New Artwork
                  </button>
                </div>

                {/* Artworks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {artworks.map((artwork) => (
                    <motion.div
                      key={artwork.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-card rounded-lg shadow-md overflow-hidden"
                    >
                      <img
                        src={artwork.image_url || '/placeholder.svg'}
                        alt={artwork.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                      <div className="p-4">
                        <h3 className="font-playfair text-lg font-semibold mb-2">{artwork.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {categories.find(cat => cat.id === artwork.category_id)?.name} • {artwork.year_created}
                        </p>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{artwork.description}</p>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingArtwork(artwork)}
                            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          >
                            <Edit size={14} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteArtwork(artwork.id)}
                            className="flex items-center gap-1 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {artworks.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No artworks added yet. Click "Add New Artwork" to get started.</p>
                  </div>
                )}
              </>
            )}

            {activeTab === 'blog' && (
              <>
                {/* Add New Blog Post Button */}
                <div className="mb-8">
                  <button
                    onClick={() => setIsBlogFormOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    <Plus size={20} />
                    Add New Blog Post
                  </button>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-card rounded-lg shadow-md overflow-hidden"
                    >
                      {post.featured_image_url && (
                        <img
                          src={post.featured_image_url}
                          alt={post.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="font-playfair text-lg font-semibold mb-2">{post.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Draft'} • {post.reading_time} min read
                        </p>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingBlogPost(post)}
                            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          >
                            <Edit size={14} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteBlogPost(post.id)}
                            className="flex items-center gap-1 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {blogPosts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No blog posts added yet. Click "Add New Blog Post" to get started.</p>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Add/Edit Forms */}
        {(isArtworkFormOpen || editingArtwork) && (
          <ArtworkForm
            artwork={editingArtwork}
            categories={categories}
            onSave={editingArtwork ? handleEditArtwork : handleAddArtwork}
            onCancel={() => {
              setIsArtworkFormOpen(false);
              setEditingArtwork(null);
            }}
          />
        )}

        {(isBlogFormOpen || editingBlogPost) && (
          <BlogForm
            post={editingBlogPost}
            onSave={editingBlogPost ? handleEditBlogPost : handleAddBlogPost}
            onCancel={() => {
              setIsBlogFormOpen(false);
              setEditingBlogPost(null);
            }}
          />
        )}
      </div>
    </div>
  );
};
