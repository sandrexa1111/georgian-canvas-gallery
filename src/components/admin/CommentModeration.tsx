
import { useEffect, useState } from 'react';
import { useComments, type Comment } from '@/hooks/useComments';
import { Star, Check, X, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const CommentModeration = () => {
  const { comments, isLoading, error, fetchComments, approveComment, deleteComment } = useComments();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending');

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const filteredComments = comments.filter(comment => {
    if (filter === 'pending') return !comment.is_approved;
    if (filter === 'approved') return comment.is_approved;
    return true;
  });

  const handleApprove = async (id: string) => {
    try {
      await approveComment(id);
    } catch (error) {
      console.error('Failed to approve comment:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this comment?')) {
      try {
        await deleteComment(id);
      } catch (error) {
        console.error('Failed to delete comment:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading comments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
        <p className="text-destructive font-medium">Error loading comments: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-playfair text-2xl font-bold">Comment Moderation</h2>
        
        <div className="flex gap-2">
          {(['all', 'pending', 'approved'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                filter === filterType
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              {filterType === 'pending' && (
                <span className="ml-2 bg-orange-500 text-white px-2 py-0.5 rounded-full text-xs">
                  {comments.filter(c => !c.is_approved).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {filteredComments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {filter === 'pending' ? 'No pending comments.' : 
             filter === 'approved' ? 'No approved comments.' : 'No comments found.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-card rounded-lg p-6 border ${
                comment.is_approved ? 'border-green-200' : 'border-orange-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium">{comment.user_name}</h3>
                    <span className="text-sm text-muted-foreground">{comment.user_email}</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className={star <= comment.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    Artwork ID: {comment.artwork_id}
                  </p>
                  
                  <p className="text-sm leading-relaxed mb-3">{comment.comment_text}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                    <span className={`px-2 py-1 rounded-full ${
                      comment.is_approved 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {comment.is_approved ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  {!comment.is_approved && (
                    <button
                      onClick={() => handleApprove(comment.id)}
                      className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                      title="Approve comment"
                    >
                      <Check size={16} />
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
                    title="Delete comment"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
