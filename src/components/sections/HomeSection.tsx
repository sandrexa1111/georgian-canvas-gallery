
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Palette, Eye } from 'lucide-react';
import { useRef } from 'react';

export const HomeSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Subtle background with parallax */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ y, opacity }}
      >
        <img
          src="/lovable-uploads/92b785c0-0831-46a3-ad0f-5c6a095c8d19.png"
          alt="Featured artwork background"
          className="w-full h-full object-cover blur-sm"
        />
      </motion.div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 border border-border rounded-full text-muted-foreground text-sm font-inter"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 0, 0, 0.05)" }}
            >
              Contemporary Georgian Artist
            </motion.div>
            
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-medium text-foreground leading-tight tracking-tight">
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Levan
              </motion.span>
              <br />
              <motion.span 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Mosiashvili
              </motion.span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-large text-muted-foreground max-w-3xl mx-auto font-inter font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Discover the beauty of Georgian landscapes, contemporary portraits, and modern artistic expressions 
            through carefully crafted paintings that bridge tradition and innovation.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              onClick={() => scrollToSection('gallery')}
              className="btn-primary flex items-center gap-3 text-base"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Palette size={18} />
              Explore Artworks
              <ArrowRight size={18} />
            </motion.button>
            
            <motion.button
              onClick={() => scrollToSection('about')}
              className="px-6 py-3 border border-border text-foreground rounded-md font-medium font-inter transition-all duration-200 hover:bg-secondary/50 hover:border-border/80 flex items-center gap-3"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye size={18} />
              About the Artist
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
