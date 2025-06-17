
import { useEffect } from 'react';
import { Star } from 'lucide-react';
import { useComments } from '@/hooks/useComments';

interface CommentsListProps {
  artworkId: string;
  refreshTrigger?: number;
}

export const CommentsList = ({ artworkId, refreshTrigger }: CommentsListProps) => {
  const { comments, isLoading, fetchComments } = useComments();

  useEffect(() => {
    fetchComments(artworkId);
  }, [artworkId, fetchComments, refreshTrigger]);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading comments...</p>
      </div>
    );
  }

  const approvedComments = comments.filter(comment => comment.is_approved);

  if (approvedComments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="font-playfair text-xl font-semibold">
        Comments ({approvedComments.length})
      </h3>
      
      {approvedComments.map((comment) => (
        <div key={comment.id} className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-medium">{comment.user_name}</h4>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    className={star <= comment.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                  />
                ))}
              </div>
            </div>
            <span className="text-sm text-muted-foreground">
              {new Date(comment.created_at).toLocaleDateString()}
            </span>
          </div>
          
          <p className="text-sm leading-relaxed">{comment.comment_text}</p>
        </div>
      ))}
    </div>
  );
};
