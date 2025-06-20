
import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { BlogPost } from '@/hooks/useBlogPosts';
import { SimpleImageUpload } from './SimpleImageUpload';

interface SimpleBlogFormProps {
  post?: BlogPost | null;
  onSave: (postData: any) => Promise<void>;
  onCancel: () => void;
}

export const SimpleBlogForm = ({ post, onSave, onCancel }: SimpleBlogFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title || '');
      setContent(post.content || '');
      setExcerpt(post.excerpt || '');
      setImageUrl(post.featured_image_url || '');
      setIsPublished(post.is_published || false);
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('Please fill in title and content');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave({
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt.trim() || null,
        featured_image_url: imageUrl.trim() || null,
        is_published: isPublished
      });
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateExcerpt = () => {
    if (content && !excerpt) {
      const words = content.replace(/<[^>]*>/g, '').split(' ');
      setExcerpt(words.slice(0, 30).join(' ') + (words.length > 30 ? '...' : ''));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">
            {post ? 'Edit Blog Post' : 'Add New Blog Post'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-md"
            disabled={isSubmitting}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog post title"
              className="w-full p-3 border rounded-md"
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Excerpt</label>
              <button
                type="button"
                onClick={generateExcerpt}
                className="text-xs text-blue-600 hover:text-blue-800"
                disabled={isSubmitting}
              >
                Auto-generate
              </button>
            </div>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description"
              rows={3}
              className="w-full p-3 border rounded-md"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content *</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post content here..."
              rows={8}
              className="w-full p-3 border rounded-md"
              disabled={isSubmitting}
              required
            />
          </div>

          <SimpleImageUpload
            currentImageUrl={imageUrl}
            onImageUpload={setImageUrl}
            onImageRemove={() => setImageUrl('')}
            disabled={isSubmitting}
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              disabled={isSubmitting}
            />
            <label htmlFor="published" className="text-sm">Published</label>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-gray-600 hover:text-gray-800"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <Save size={16} />
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
