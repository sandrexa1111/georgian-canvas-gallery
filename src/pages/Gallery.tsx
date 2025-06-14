import { useState } from 'react';
import { ArtworkModal } from '@/components/ArtworkModal';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Navigation } from '@/components/Navigation';

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
  },
  {
    id: 7,
    title: "Mother and Child with Bird",
    image: "/lovable-uploads/bd676107-6b4f-4066-8a4d-e617fc85ae1e.png",
    dimensions: "85 x 70 cm",
    medium: "Acrylic on Canvas",
    year: 2024,
    description: "A tender portrayal of motherhood featuring vibrant colors and symbolic elements, representing the bond between mother and child in Georgian culture.",
    category: "Portrait"
  },
  {
    id: 8,
    title: "Georgian Couple",
    image: "/lovable-uploads/50ae435f-dccd-44a0-ba4e-864c46d0405e.png",
    dimensions: "80 x 65 cm",
    medium: "Mixed Media",
    year: 2024,
    description: "A colorful representation of a traditional Georgian couple, showcasing the rich cultural heritage through folk art styling and vibrant patterns.",
    category: "Portrait"
  },
  {
    id: 9,
    title: "Village Celebration",
    image: "/lovable-uploads/5030fc45-5a3e-48ce-b2d1-45ac8e719910.png",
    dimensions: "100 x 80 cm",
    medium: "Oil on Canvas",
    year: 2024,
    description: "A lively scene depicting a traditional Georgian village celebration with multiple figures in traditional dress, capturing the communal spirit of Georgian culture.",
    category: "Cultural Heritage"
  },
  {
    id: 10,
    title: "Golden Cathedral",
    image: "/lovable-uploads/51c2463f-fa2d-4990-adea-80a35a205610.png",
    dimensions: "90 x 75 cm",
    medium: "Oil on Canvas",
    year: 2024,
    description: "A magnificent architectural composition featuring Georgian church towers and traditional buildings bathed in golden light.",
    category: "Landscape"
  },
  {
    id: 11,
    title: "Traditional Dancers",
    image: "/lovable-uploads/4fc542f8-6819-4ab6-ab09-b2181006812c.png",
    dimensions: "85 x 70 cm",
    medium: "Acrylic on Canvas",
    year: 2024,
    description: "Dynamic figures in traditional Georgian dance costumes, capturing the energy and grace of folk dance traditions.",
    category: "Cultural Heritage"
  },
  {
    id: 12,
    title: "Woman in Red Veil",
    image: "/lovable-uploads/c27bb1d3-7414-4be5-971f-9bc2a1dbd3b6.png",
    dimensions: "70 x 55 cm",
    medium: "Mixed Media",
    year: 2024,
    description: "An intimate portrait of a woman in traditional red veil, painted with warm earth tones that convey deep emotion and cultural identity.",
    category: "Portrait"
  }
];

const Gallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const categories = [
    'All', 
    'Landscape', 
    'Portrait', 
    'Still Life', 
    'Religious', 
    'Abstract',
    'Cultural Heritage'
  ];

  const filteredArtworks = filter === 'All' 
    ? artworks 
    : artworks.filter(artwork => artwork.category === filter);

  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArtworks = filteredArtworks.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when filter changes
  const handleFilterChange = (category: string) => {
    setFilter(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="py-20">
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
                onClick={() => handleFilterChange(category)}
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
            {currentArtworks.map((artwork, index) => (
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(currentPage - 1);
                        }}
                      />
                    </PaginationItem>
                  )}
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === i + 1}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(i + 1);
                        }}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(currentPage + 1);
                        }}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}

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
    </div>
  );
};

export default Gallery;
