
import { motion } from 'framer-motion';
import { ArrowRight, Palette, Eye, Sparkles } from 'lucide-react';

export const HomeSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden section-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="absolute inset-0 opacity-10">
        <img
          src="/lovable-uploads/92b785c0-0831-46a3-ad0f-5c6a095c8d19.png"
          alt="Featured artwork background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="space-y-6"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-dm-sans"
              animate={{ glow: true }}
            >
              <Sparkles size={16} className="animate-pulse-glow" />
              Georgian Contemporary Artist
            </motion.div>
            
            <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl font-semibold text-white text-glow leading-none tracking-tight">
              Levan
              <br />
              <span className="text-primary">Mosiashvili</span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto font-inter font-light leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            Discover the beauty of Georgian landscapes, abstract portraits, and modern surrealism 
            through the eyes of a passionate artist
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <motion.button
              onClick={() => scrollToSection('gallery')}
              className="btn-primary flex items-center gap-3 text-lg font-dm-sans font-medium"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Palette size={20} />
              View Gallery
              <ArrowRight size={20} />
            </motion.button>
            
            <motion.button
              onClick={() => scrollToSection('about')}
              className="px-8 py-4 border-2 border-primary/40 text-primary rounded-full font-dm-sans font-medium transition-all duration-300 hover:bg-primary/10 hover:border-primary hover:shadow-lg hover:shadow-primary/30 flex items-center gap-3"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye size={20} />
              About the Artist
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
