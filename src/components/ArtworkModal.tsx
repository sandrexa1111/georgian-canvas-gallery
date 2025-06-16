
import { X } from 'lucide-react';
import { CommentForm } from './CommentForm';
import { CommentsList } from './CommentsList';

interface Artwork {
  id: number;
  title: string;
  image: string;
  dimensions: string;
  medium: string;
  year: number;
  description: string;
  category: string;
  period: string;
  price?: string;
}

interface ArtworkModalProps {
  artwork: Artwork;
  isOpen: boolean;
  onClose: () => void;
}

export const ArtworkModal = ({ artwork, isOpen, onClose }: ArtworkModalProps) => {
  if (!isOpen) return null;

  const handleRefreshComments = () => {
    // This will trigger a re-render and fetch comments
    console.log('Comments refreshed');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full">
        <div className="sticky top-0 bg-background border-b border-border p-4 flex justify-between items-center">
          <h2 className="font-playfair text-2xl font-bold">{artwork.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  {artwork.period}
                </div>
                
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Dimensions:</span> {artwork.dimensions}</p>
                  <p><span className="font-medium">Medium:</span> {artwork.medium}</p>
                  <p><span className="font-medium">Year:</span> {artwork.year}</p>
                  <p><span className="font-medium">Category:</span> {artwork.category}</p>
                  {artwork.price && <p><span className="font-medium">Price:</span> {artwork.price}</p>}
                </div>
              </div>
              
              <div>
                <h3 className="font-playfair text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{artwork.description}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 space-y-8">
            <CommentsList artworkId={artwork.id.toString()} />
            <CommentForm 
              artworkId={artwork.id.toString()} 
              onCommentAdded={handleRefreshComments}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
