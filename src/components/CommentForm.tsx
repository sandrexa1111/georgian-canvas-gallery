
import { useState } from 'react';
import { Star } from 'lucide-react';
import { useComments } from '@/hooks/useComments';

interface CommentFormProps {
  artworkId: string;
  onCommentAdded?: () => void;
}

export const CommentForm = ({ artworkId, onCommentAdded }: CommentFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addComment } = useComments();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !comment.trim()) return;

    setIsSubmitting(true);
    try {
      await addComment({
        artwork_id: artworkId,
        user_name: name.trim(),
        user_email: email.trim(),
        comment_text: comment.trim(),
        rating,
      });

      // Reset form
      setName('');
      setEmail('');
      setComment('');
      setRating(5);
      
      onCommentAdded?.();
    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="font-playfair text-xl font-semibold mb-4">Leave a Comment</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Rating *</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`p-1 transition-colors ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                <Star size={20} fill={star <= rating ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium mb-1">
            Comment *
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-md bg-background focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Share your thoughts about this artwork..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !name.trim() || !email.trim() || !comment.trim()}
          className="w-full md:w-auto px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Comment'}
        </button>
      </form>
    </div>
  );
};
