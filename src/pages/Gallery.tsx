
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
    title: "Sunset Over Kakheti",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    dimensions: "80 x 60 cm",
    medium: "Oil on Canvas",
    year: 2023,
    description: "A breathtaking view of the Kakheti wine region during golden hour, capturing the rolling hills and vineyards that define Georgian countryside.",
    category: "Landscape"
  },
  {
    id: 2,
    title: "Abstract Portrait III",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    dimensions: "70 x 50 cm",
    medium: "Acrylic on Canvas",
    year: 2023,
    description: "An exploration of human emotion through abstract forms and warm lighting, representing the complexity of the human spirit.",
    category: "Portrait"
  },
  {
    id: 3,
    title: "Mountain Harmony",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    dimensions: "100 x 70 cm",
    medium: "Oil on Canvas",
    year: 2022,
    description: "The majestic Caucasus mountains reflected in pristine waters, symbolizing the eternal dialogue between earth and sky.",
    category: "Landscape"
  },
  {
    id: 4,
    title: "Forest Dreams",
    image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
    dimensions: "60 x 80 cm",
    medium: "Mixed Media",
    year: 2023,
    description: "Sunbeams piercing through dense Georgian forest, creating a mystical atmosphere that speaks to the soul.",
    category: "Surrealism"
  },
  {
    id: 5,
    title: "Urban Contemplation",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    dimensions: "90 x 60 cm",
    medium: "Oil on Canvas",
    year: 2023,
    description: "A modern interior space that reflects contemporary Georgian life, blending traditional warmth with modern aesthetics.",
    category: "Modern"
  },
  {
    id: 6,
    title: "Nature's Offering",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    dimensions: "40 x 40 cm",
    medium: "Watercolor",
    year: 2022,
    description: "A still life celebrating the abundance of Georgian harvest, painted with delicate watercolor techniques.",
    category: "Still Life"
  }
];

const Gallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Landscape', 'Portrait', 'Surrealism', 'Modern', 'Still Life'];

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
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                filter === category
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
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
                  src={`${artwork.image}?w=500&h=600&fit=crop`}
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
