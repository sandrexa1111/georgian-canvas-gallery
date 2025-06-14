
import { Link } from 'react-router-dom';
import { ArrowRight, Palette, Eye } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        
        {/* Featured Artwork Background */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop"
            alt="Featured artwork background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 text-glow">
              Levan Mosiashvili
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Discover the beauty of Georgian landscapes, abstract portraits, and modern surrealism 
              through the eyes of a passionate artist
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/gallery"
                className="btn-primary flex items-center gap-2 text-lg animate-glow"
              >
                <Palette size={20} />
                View Gallery
                <ArrowRight size={20} />
              </Link>
              
              <Link
                to="/about"
                className="px-6 py-3 border border-primary text-primary rounded-md font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground flex items-center gap-2"
              >
                <Eye size={20} />
                About the Artist
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Works Preview */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold mb-4">Featured Artworks</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A glimpse into the diverse world of Georgian artistry, from traditional landscapes 
              to contemporary abstract expressions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Sunset Over Kakheti",
                image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
                category: "Landscape"
              },
              {
                title: "Abstract Portrait III",
                image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
                category: "Portrait"
              },
              {
                title: "Mountain Harmony",
                image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
                category: "Surrealism"
              }
            ].map((artwork, index) => (
              <div
                key={index}
                className="art-card group cursor-pointer"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={`${artwork.image}?w=400&h=500&fit=crop`}
                    alt={artwork.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm text-gray-300">{artwork.category}</p>
                    <h3 className="font-playfair text-lg font-semibold">{artwork.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/gallery"
              className="btn-primary inline-flex items-center gap-2"
            >
              View All Artworks
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Artist Statement */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl md:text-3xl font-playfair italic text-muted-foreground leading-relaxed">
            "Art is the bridge between the soul of Georgia and the hearts of those who witness its beauty. 
            Through every brushstroke, I aim to capture not just the visual splendor of our landscapes, 
            but the emotional depth that defines our heritage."
          </blockquote>
          <p className="text-primary font-semibold mt-6">— Levan Mosiashvili</p>
        </div>
      </section>
    </div>
  );
};

export default Index;
