
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

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
    hidden: { opacity: 0, y: 60, rotateX: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section id="gallery" className="section-spacing min-h-screen relative overflow-hidden">
      {/* Dynamic background elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/5 w-96 h-96 bg-white/3 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div 
          className="text-center mb-24 space-y-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="font-playfair text-5xl md:text-7xl font-semibold"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            Art <motion.span 
              className="text-primary"
              animate={{ 
                textShadow: [
                  "0 0 10px rgba(255, 255, 255, 0.3)",
                  "0 0 20px rgba(255, 255, 255, 0.5)"
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              Gallery
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-xl md:text-2xl max-w-4xl mx-auto font-inter leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Explore a collection of paintings that capture the essence of Georgian culture, 
            from traditional landscapes to contemporary abstract expressions.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gallery-spacing"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {artworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              variants={itemVariants}
              className="art-card cursor-pointer group perspective-1000"
              onClick={() => setSelectedArtwork(artwork)}
              onHoverStart={() => setHoveredCard(artwork.id)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ 
                y: -12,
                rotateY: hoveredCard === artwork.id ? 5 : 0,
                scale: 1.02
              }}
              transition={{ 
                duration: 0.4, 
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              style={{
                transformStyle: "preserve-3d"
              }}
            >
              <div className="relative overflow-hidden rounded-xl">
                <motion.img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-96 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
                
                {/* Dynamic overlay with particles effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated particles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/60 rounded-full"
                      style={{
                        left: `${20 + (i * 10)}%`,
                        top: `${30 + (i * 8)}%`
                      }}
                      animate={hoveredCard === artwork.id ? {
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        y: [0, -20, -40]
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                  
                  <div className="absolute bottom-6 left-6 text-white space-y-2">
                    <motion.div 
                      className="inline-block px-3 py-1 bg-primary/30 border border-primary/50 rounded-full text-xs text-primary font-dm-sans font-medium backdrop-blur-sm"
                      whileHover={{ scale: 1.1 }}
                    >
                      {artwork.category}
                    </motion.div>
                    <motion.h3 
                      className="font-playfair text-2xl font-semibold"
                      initial={{ x: -20, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {artwork.title}
                    </motion.h3>
                    <motion.p 
                      className="text-sm text-gray-300 font-inter"
                      initial={{ x: -20, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {artwork.year}
                    </motion.p>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="p-8 space-y-4"
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
                transition={{ duration: 0.3 }}
              >
                <motion.h3 
                  className="font-playfair text-2xl font-semibold"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {artwork.title}
                </motion.h3>
                <div className="space-y-1 text-muted-foreground font-inter">
                  <motion.p 
                    className="text-sm"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    {artwork.dimensions} • {artwork.medium}
                  </motion.p>
                  <motion.p 
                    className="text-sm"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                  >
                    {artwork.year}
                  </motion.p>
                </div>
                <motion.p 
                  className="text-muted-foreground leading-relaxed font-inter line-clamp-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {artwork.description}
                </motion.p>
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
