
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Plus, Edit, Trash2, BookOpen, Image } from 'lucide-react';
import { ArtworkForm } from './ArtworkForm';
import { BlogForm } from './BlogForm';
import { useArtworks, type Artwork } from '@/hooks/useArtworks';
import { useBlogPosts, type BlogPost } from '@/hooks/useBlogPosts';

interface AdminPanelProps {
  onLogout: () => void;
}

export const AdminPanel = ({ onLogout }: AdminPanelProps) => {
  const { artworks, categories, isLoading: artworksLoading, addArtwork, updateArtwork, deleteArtwork } = useArtworks();
  const { blogPosts, isLoading: blogLoading, addBlogPost, updateBlogPost, deleteBlogPost } = useBlogPosts();
  
  const [activeTab, setActiveTab] = useState<'artworks' | 'blog'>('artworks');
  const [isArtworkFormOpen, setIsArtworkFormOpen] = useState(false);
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('gallery_admin_auth');
    onLogout();
  };

  const handleAddArtwork = async (artworkData: any) => {
    try {
      await addArtwork(artworkData);
      setIsArtworkFormOpen(false);
    } catch (error) {
      console.error('Failed to add artwork:', error);
    }
  };

  const handleEditArtwork = async (artworkData: any) => {
    if (!editingArtwork) return;
    
    try {
      await updateArtwork(editingArtwork.id, artworkData);
      setEditingArtwork(null);
    } catch (error) {
      console.error('Failed to update artwork:', error);
    }
  };

  const handleDeleteArtwork = async (id: string) => {
    if (confirm('Are you sure you want to delete this artwork?')) {
      try {
        await deleteArtwork(id);
      } catch (error) {
        console.error('Failed to delete artwork:', error);
      }
    }
  };

  const handleAddBlogPost = async (postData: any) => {
    try {
      await addBlogPost(postData);
      setIsBlogFormOpen(false);
    } catch (error) {
      console.error('Failed to add blog post:', error);
    }
  };

  const handleEditBlogPost = async (postData: any) => {
    if (!editingBlogPost) return;
    
    try {
      await updateBlogPost(editingBlogPost.id, postData);
      setEditingBlogPost(null);
    } catch (error) {
      console.error('Failed to update blog post:', error);
    }
  };

  const handleDeleteBlogPost = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlogPost(id);
      } catch (error) {
        console.error('Failed to delete blog post:', error);
      }
    }
  };

  const isLoading = artworksLoading || blogLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="font-playfair text-xl font-bold">Gallery Admin Panel</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
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
              Artworks
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
              Blog Posts
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
