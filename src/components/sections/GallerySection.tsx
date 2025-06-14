
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArtworkModal } from '@/components/ArtworkModal';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

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
    category: "Landscape",
    period: "Contemporary (2020-2024)"
  },
  {
    id: 2,
    title: "Woman in Red Headscarf",
    image: "/lovable-uploads/c8a6f9c1-2bf7-4772-8861-49272f578733.png",
    dimensions: "70 x 50 cm",
    medium: "Mixed Media",
    year: 2023,
    description: "A powerful portrait featuring traditional Georgian motifs and patterns, celebrating the strength and beauty of Georgian women.",
    category: "Portrait",
    period: "Contemporary (2020-2024)"
  },
  {
    id: 3,
    title: "Garden of Joy",
    image: "/lovable-uploads/f4bf28cf-5a78-4850-ac2f-0da3ac18d60e.png",
    dimensions: "90 x 70 cm",
    medium: "Acrylic on Canvas",
    year: 2022,
    description: "An explosion of colorful flowers and patterns creating a joyful celebration of nature's abundance and the beauty of Georgian gardens.",
    category: "Still Life",
    period: "Contemporary (2020-2024)"
  },
  {
    id: 4,
    title: "Midnight Village",
    image: "/lovable-uploads/6f1afc91-f743-481a-8885-e127cc111d5f.png",
    dimensions: "100 x 80 cm",
    medium: "Oil on Canvas",
    year: 2023,
    description: "A mystical nighttime scene of a Georgian village under the moonlight, painted in deep blues that evoke tranquility and contemplation.",
    category: "Landscape",
    period: "Contemporary (2020-2024)"
  },
  {
    id: 5,
    title: "Saint George and the Dragon",
    image: "/lovable-uploads/74d1fbce-2058-422e-82d9-3daf3dd000e6.png",
    dimensions: "85 x 65 cm",
    medium: "Mixed Media",
    year: 2022,
    description: "A modern interpretation of Georgia's patron saint, blending traditional iconography with contemporary artistic expression.",
    category: "Religious",
    period: "Contemporary (2020-2024)"
  },
  {
    id: 6,
    title: "Red Lady",
    image: "/lovable-uploads/8f081d62-6772-48f8-aba5-e3f813da7c06.png",
    dimensions: "75 x 60 cm",
    medium: "Acrylic on Canvas",
    year: 2023,
    description: "A contemplative figure in vibrant reds and oranges, representing the warmth and passion of Georgian culture through abstract form.",
    category: "Abstract",
    period: "Contemporary (2020-2024)"
  },
  {
    id: 7,
    title: "Mother and Child with Bird",
    image: "/lovable-uploads/bd676107-6b4f-4066-8a4d-e617fc85ae1e.png",
    dimensions: "85 x 70 cm",
    medium: "Acrylic on Canvas",
    year: 2024,
    description: "A tender portrayal of motherhood featuring vibrant colors and symbolic elements, representing the bond between mother and child in Georgian culture.",
    category: "Portrait",
    period: "Contemporary (2020-2024)"
  },
  {
    id: 8,
    title: "Georgian Couple",
    image: "/lovable-uploads/50ae435f-dccd-44a0-ba4e-864c46d0405e.png",
    dimensions: "80 x 65 cm",
    medium: "Mixed Media",
    year: 2024,
    description: "A colorful representation of a traditional Georgian couple, showcasing the rich cultural heritage through folk art styling and vibrant patterns.",
    category: "Portrait",
    period: "Contemporary (2020-2024)"
  },
  {
    id: 9,
    title: "Village Celebration",
    image: "/lovable-uploads/5030fc45-5a3e-48ce-b2d1-45ac8e719910.png",
    dimensions: "100 x 80 cm",
    medium: "Oil on Canvas",
    year: 2024,
    description: "A lively scene depicting a traditional Georgian village celebration with multiple figures in traditional dress, capturing the communal spirit of Georgian culture.",
    category: "Cultural Heritage",
    period: "Contemporary (2020-2024)"
  },
  {
    id: 10,
    title: "Golden Cathedral",
    image: "/lovable-uploads/51c2463f-fa2d-4990-adea-80a35a205610.png",
    dimensions: "90 x 75 cm",
    medium: "Oil on Canvas",
    year: 2024,
    description: "A magnificent architectural composition featuring Georgian church towers and traditional buildings bathed in golden light.",
    category: "Landscape",
    period: "Contemporary (2020-2024)"
  },
  {
    id: 11,
    title: "Traditional Dancers",
    image: "/lovable-uploads/4fc542f8-6819-4ab6-ab09-b2181006812c.png",
    dimensions: "85 x 70 cm",
    medium: "Acrylic on Canvas",
    year: 2024,
    description: "Dynamic figures in traditional Georgian dance costumes, capturing the energy and grace of folk dance traditions.",
    category: "Cultural Heritage",
    period: "Contemporary (2020-2024)"
  },
  {
    id: 12,
    title: "Woman in Red Veil",
    image: "/lovable-uploads/c27bb1d3-7414-4be5-971f-9bc2a1dbd3b6.png",
    dimensions: "70 x 55 cm",
    medium: "Mixed Media",
    year: 2024,
    description: "An intimate portrait of a woman in traditional red veil, painted with warm earth tones that convey deep emotion and cultural identity.",
    category: "Portrait",
    period: "Contemporary (2020-2024)"
  }
];

export const GallerySection = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [periodFilter, setPeriodFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const categories = [
    'All', 
    'Landscape', 
    'Portrait', 
    'Still Life', 
    'Religious', 
    'Abstract',
    'Cultural Heritage'
  ];

  const periods = [
    'All',
    'Contemporary (2020-2024)'
  ];

  const filteredArtworks = artworks.filter(artwork => {
    const categoryMatch = categoryFilter === 'All' || artwork.category === categoryFilter;
    const periodMatch = periodFilter === 'All' || artwork.period === periodFilter;
    return categoryMatch && periodMatch;
  });

  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArtworks = filteredArtworks.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when filters change
  const handleCategoryFilterChange = (category: string) => {
    setCategoryFilter(category);
    setCurrentPage(1);
  };

  const handlePeriodFilterChange = (period: string) => {
    setPeriodFilter(period);
    setCurrentPage(1);
  };

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
      rotateX: 0
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

        {/* Filters */}
        <motion.div 
          className="space-y-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Period Filter */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 text-center">Filter by Period</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {periods.map((period) => (
                <motion.button
                  key={period}
                  onClick={() => handlePeriodFilterChange(period)}
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                    periodFilter === period
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {period}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 text-center">Filter by Category</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => handleCategoryFilterChange(category)}
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                    categoryFilter === category
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gallery-spacing"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          key={currentPage}
        >
          {currentArtworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              variants={itemVariants}
              transition={{
                duration: 0.8,
                ease: "easeOut"
              }}
              className="art-card cursor-pointer group perspective-1000"
              onClick={() => setSelectedArtwork(artwork)}
              onHoverStart={() => setHoveredCard(artwork.id)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ 
                y: -12,
                rotateY: hoveredCard === artwork.id ? 5 : 0,
                scale: 1.02
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
                  transition={{ duration: 0.6, ease: "easeOut" }}
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
                      {artwork.year} • {artwork.period}
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
                    {artwork.year} • {artwork.period}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div 
            className="mt-16 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
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
          </motion.div>
        )}

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
