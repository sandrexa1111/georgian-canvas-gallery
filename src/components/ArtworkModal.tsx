
import { X, MessageCircle } from 'lucide-react';

interface Artwork {
  id: number;
  title: string;
  image: string;
  dimensions: string;
  medium: string;
  year: number;
  description: string;
  category: string;
  price?: string;
}

interface ArtworkModalProps {
  artwork: Artwork;
  isOpen: boolean;
  onClose: () => void;
}

export const ArtworkModal = ({ artwork, isOpen, onClose }: ArtworkModalProps) => {
  if (!isOpen) return null;

  const handleWhatsAppContact = () => {
    const message = `Hello! I'm interested in the artwork "${artwork.title}" (${artwork.year}). Could you please provide more information about purchasing this piece?`;
    const whatsappUrl = `https://wa.me/995555123456?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailContact = () => {
    const subject = `Inquiry about "${artwork.title}"`;
    const body = `Hello,\n\nI'm interested in the artwork "${artwork.title}" (${artwork.year}, ${artwork.dimensions}, ${artwork.medium}).\n\nCould you please provide more information about purchasing this piece?\n\nThank you!`;
    const emailUrl = `mailto:info@levanmosiashvili.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = emailUrl;
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <X size={24} />
          </button>

          {/* Image */}
          <div className="relative">
            <img
              src={`${artwork.image}?w=800&h=600&fit=crop`}
              alt={artwork.title}
              className="w-full h-96 md:h-[500px] object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Artwork Details */}
              <div>
                <div className="mb-4">
                  <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {artwork.category}
                  </span>
                </div>
                
                <h2 className="font-playfair text-3xl font-bold mb-4">{artwork.title}</h2>
                
                <div className="space-y-2 text-muted-foreground mb-6">
                  <p><strong>Dimensions:</strong> {artwork.dimensions}</p>
                  <p><strong>Medium:</strong> {artwork.medium}</p>
                  <p><strong>Year:</strong> {artwork.year}</p>
                </div>

                <p className="text-foreground leading-relaxed">
                  {artwork.description}
                </p>
              </div>

              {/* Purchase Information */}
              <div className="bg-secondary/30 p-6 rounded-lg">
                <h3 className="font-playfair text-xl font-semibold mb-4">Interested in this piece?</h3>
                <p className="text-muted-foreground mb-6">
                  Contact us to inquire about availability, pricing, and shipping options for this artwork.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={handleWhatsAppContact}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={20} />
                    Contact via WhatsApp
                  </button>
                  
                  <button
                    onClick={handleEmailContact}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    Send Email Inquiry
                  </button>
                </div>

                <div className="mt-6 text-sm text-muted-foreground">
                  <p className="mb-2"><strong>What to expect:</strong></p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Response within 24 hours</li>
                    <li>Detailed pricing information</li>
                    <li>Shipping and framing options</li>
                    <li>Certificate of authenticity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
