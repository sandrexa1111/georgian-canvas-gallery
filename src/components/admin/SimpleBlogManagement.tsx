
import { useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useSimpleBlog } from '@/hooks/useSimpleBlog';
import { SimpleBlogForm } from './SimpleBlogForm';

export const SimpleBlogManagement = () => {
  const { posts, loading, error, createPost, updatePost, deletePost, fetchPosts } = useSimpleBlog();
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const handleSave = async (postData: any) => {
    try {
      if (editingPost) {
        await updatePost(editingPost.id, postData);
      } else {
        await createPost(postData);
      }
      setShowForm(false);
      setEditingPost(null);
    } catch (error) {
      alert('Failed to save post');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this post?')) {
      try {
        await deletePost(id);
      } catch (error) {
        alert('Failed to delete post');
      }
    }
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Error: {error}</p>
        <button
          onClick={() => fetchPosts(true)}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Blog Posts</h2>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <Plus size={18} />
            New Post
          </button>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No posts found. Create your first post!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg p-6 border shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{post.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        post.is_published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.is_published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {post.excerpt || post.content.substring(0, 150) + '...'}
                    </p>
                    
                    <p className="text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2 ml-4">
                    {post.is_published && (
                      <button
                        onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                        className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200"
                      >
                        <Eye size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <SimpleBlogForm
          post={editingPost}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingPost(null);
          }}
        />
      )}
    </>
  );
};
