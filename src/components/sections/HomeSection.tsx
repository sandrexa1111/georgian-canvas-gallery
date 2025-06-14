
import { motion } from 'framer-motion';
import { ArrowRight, Palette, Eye } from 'lucide-react';

export const HomeSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
      
      <div className="absolute inset-0 opacity-20">
        <img
          src="/lovable-uploads/92b785c0-0831-46a3-ad0f-5c6a095c8d19.png"
          alt="Featured artwork background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 text-glow"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Levan Mosiashvili
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover the beauty of Georgian landscapes, abstract portraits, and modern surrealism 
            through the eyes of a passionate artist
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onClick={() => scrollToSection('gallery')}
              className="btn-primary flex items-center gap-2 text-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(218, 165, 32, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Palette size={20} />
              View Gallery
              <ArrowRight size={20} />
            </motion.button>
            
            <motion.button
              onClick={() => scrollToSection('about')}
              className="px-6 py-3 border border-primary text-primary rounded-md font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
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
