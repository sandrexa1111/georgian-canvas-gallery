
import { useState } from 'react';
import { ArtworkModal } from '@/components/ArtworkModal';

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

const artworks: Artwork[] = [
  {
    id: 1,
    title: "Golden Village",
    image: "/lovable-uploads/92b785c0-0831-46a3-ad0f-5c6a095c8d19.png",
    dimensions: "80 x 60 cm",
    medium: "Oil on Canvas",
    year: 2023,
    description: "A vibrant depiction of traditional Georgian architecture with warm golden tones, showcasing the harmony between rural life and natural beauty.",
    category: "Landscape"
  },
  {
    id: 2,
    title: "Woman in Red Headscarf",
    image: "/lovable-uploads/c8a6f9c1-2bf7-4772-8861-49272f578733.png",
    dimensions: "70 x 50 cm",
    medium: "Mixed Media",
    year: 2023,
    description: "A powerful portrait featuring traditional Georgian motifs and patterns, celebrating the strength and beauty of Georgian women.",
    category: "Portrait"
  },
  {
    id: 3,
    title: "Garden of Joy",
    image: "/lovable-uploads/f4bf28cf-5a78-4850-ac2f-0da3ac18d60e.png",
    dimensions: "90 x 70 cm",
    medium: "Acrylic on Canvas",
    year: 2022,
    description: "An explosion of colorful flowers and patterns creating a joyful celebration of nature's abundance and the beauty of Georgian gardens.",
    category: "Still Life"
  },
  {
    id: 4,
    title: "Midnight Village",
    image: "/lovable-uploads/6f1afc91-f743-481a-8885-e127cc111d5f.png",
    dimensions: "100 x 80 cm",
    medium: "Oil on Canvas",
    year: 2023,
    description: "A mystical nighttime scene of a Georgian village under the moonlight, painted in deep blues that evoke tranquility and contemplation.",
    category: "Landscape"
  },
  {
    id: 5,
    title: "Saint George and the Dragon",
    image: "/lovable-uploads/74d1fbce-2058-422e-82d9-3daf3dd000e6.png",
    dimensions: "85 x 65 cm",
    medium: "Mixed Media",
    year: 2022,
    description: "A modern interpretation of Georgia's patron saint, blending traditional iconography with contemporary artistic expression.",
    category: "Religious"
  },
  {
    id: 6,
    title: "Red Lady",
    image: "/lovable-uploads/8f081d62-6772-48f8-aba5-e3f813da7c06.png",
    dimensions: "75 x 60 cm",
    medium: "Acrylic on Canvas",
    year: 2023,
    description: "A contemplative figure in vibrant reds and oranges, representing the warmth and passion of Georgian culture through abstract form.",
    category: "Abstract"
  }
];

const Gallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = [
    'All', 
    'Landscape', 
    'Portrait', 
    'Still Life', 
    'Religious', 
    'Abstract',
    'Traditional',
    'Contemporary',
    'Nature',
    'Cultural Heritage'
  ];

  const filteredArtworks = filter === 'All' 
    ? artworks 
    : artworks.filter(artwork => artwork.category === filter);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-playfair text-5xl font-bold mb-6">Art Gallery</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Explore a collection of paintings that capture the essence of Georgian culture, 
            from traditional landscapes to contemporary abstract expressions.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                filter === category
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtworks.map((artwork, index) => (
            <div
              key={artwork.id}
              className="art-card cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedArtwork(artwork)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-80 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm text-gray-300">{artwork.category}</p>
                    <h3 className="font-playfair text-xl font-semibold">{artwork.title}</h3>
                    <p className="text-sm text-gray-400">{artwork.year}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold mb-2">{artwork.title}</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>{artwork.dimensions} • {artwork.medium}</p>
                  <p>{artwork.year}</p>
                </div>
                <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                  {artwork.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedArtwork && (
          <ArtworkModal
            artwork={selectedArtwork}
            isOpen={!!selectedArtwork}
            onClose={() => setSelectedArtwork(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Gallery;
