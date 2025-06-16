
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArtworkModal } from '@/components/ArtworkModal';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useArtworks, getPeriodFromYear, getAvailablePeriods, type Artwork as SupabaseArtwork, type Category } from '@/hooks/useArtworks';

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

export const GallerySection = () => {
  const { artworks: supabaseArtworks, categories, isLoading, error } = useArtworks();
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [periodFilter, setPeriodFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Convert Supabase artworks to the expected format
  const convertedArtworks: Artwork[] = supabaseArtworks
    .filter(artwork => artwork.is_published)
    .map((artwork: SupabaseArtwork) => {
      const category = categories.find(cat => cat.id === artwork.category_id);
      return {
        id: parseInt(artwork.id.replace(/-/g, '').substring(0, 8), 16),
        title: artwork.title,
        image: artwork.image_url || '/placeholder.svg',
        dimensions: artwork.dimensions || '',
        medium: artwork.medium || '',
        year: artwork.year_created || new Date().getFullYear(),
        description: artwork.description || '',
        category: category?.name || 'Uncategorized',
        period: getPeriodFromYear(artwork.year_created || new Date().getFullYear())
      };
    });

  const availableCategories = ['All', ...Array.from(new Set(convertedArtworks.map(artwork => artwork.category)))];
  const availablePeriods = getAvailablePeriods().filter(period => 
    period === 'All' || convertedArtworks.some(artwork => artwork.period === period)
  );

  // Filter artworks
  const filteredArtworks = convertedArtworks.filter(artwork => {
    const categoryMatch = categoryFilter === 'All' || artwork.category === categoryFilter;
    const periodMatch = periodFilter === 'All' || artwork.period === periodFilter;
    return categoryMatch && periodMatch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArtworks = filteredArtworks.slice(startIndex, startIndex + itemsPerPage);

  // Filter change handlers
  const handleCategoryFilterChange = (category: string) => {
    setCategoryFilter(category);
    setCurrentPage(1);
  };

  const handlePeriodFilterChange = (period: string) => {
    setPeriodFilter(period);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <section id="gallery" className="section-spacing min-h-screen relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="gallery" className="section-spacing min-h-screen relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4">
              <p className="text-destructive font-medium">Failed to load gallery: {error}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="section-spacing min-h-screen relative overflow-hidden">
      {/* Background elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/5 w-96 h-96 bg-white/3 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-24 space-y-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-playfair text-5xl md:text-7xl font-semibold">
            Art <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-muted-foreground text-xl md:text-2xl max-w-4xl mx-auto font-inter leading-relaxed">
            Explore a collection of paintings that span from Georgian heritage to French influences, 
            showcasing the artistic evolution through different periods and styles.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="space-y-6 mb-12">
          {/* Period Filter */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 text-center">Filter by Art Period</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {availablePeriods.map((period) => (
                <button
                  key={period}
                  onClick={() => handlePeriodFilterChange(period)}
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                    periodFilter === period
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 text-center">Filter by Category</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {availableCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilterChange(category)}
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                    categoryFilter === category
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentArtworks.map((artwork) => (
            <motion.div
              key={`${artwork.id}-${categoryFilter}-${periodFilter}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300"
              onClick={() => setSelectedArtwork(artwork)}
              whileHover={{ y: -4 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="inline-block px-2 py-1 bg-primary/80 rounded-full text-xs font-medium mb-2">
                      {artwork.period}
                    </div>
                    <h3 className="font-playfair text-lg font-semibold">
                      {artwork.title}
                    </h3>
                    <p className="text-sm text-gray-200">
                      {artwork.year} • {artwork.category}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold mb-2">
                  {artwork.title}
                </h3>
                <div className="text-sm text-muted-foreground mb-3">
                  <p>{artwork.dimensions} • {artwork.medium}</p>
                  <p>{artwork.year} • {artwork.period}</p>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {artwork.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No results message */}
        {currentArtworks.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No artworks found matching your filters.
            </p>
          </div>
        )}

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
    </section>
  );
};
