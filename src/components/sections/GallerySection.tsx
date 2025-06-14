
import { useState } from 'react';
import { motion } from 'framer-motion';
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

export const GallerySection = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="gallery" className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Art Gallery</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Explore a collection of paintings that capture the essence of Georgian culture, 
            from traditional landscapes to contemporary abstract expressions.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {artworks.map((artwork) => (
            <motion.div
              key={artwork.id}
              variants={itemVariants}
              className="art-card cursor-pointer group"
              onClick={() => setSelectedArtwork(artwork)}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-80 object-cover transition-transform duration-500"
                  whileHover={{ scale: 1.1 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm text-gray-300">{artwork.category}</p>
                    <h3 className="font-playfair text-xl font-semibold">{artwork.title}</h3>
                    <p className="text-sm text-gray-400">{artwork.year}</p>
                  </div>
                </motion.div>
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
            </motion.div>
          ))}
        </motion.div>

        {selectedArtwork && (
          <ArtworkModal
            artwork={selectedArtwork}
            isOpen={!!selectedArtwork}
            onClose={() => setSelectedArtwork(null)}
          />
        )}
      </div>
    </section>
  );
};
