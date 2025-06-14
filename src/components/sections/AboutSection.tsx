
import { motion } from 'framer-motion';

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-8">About the Artist</h2>
          
          <motion.blockquote 
            className="text-2xl md:text-3xl font-playfair italic text-muted-foreground leading-relaxed mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            "Art is the bridge between the soul of Georgia and the hearts of those who witness its beauty. 
            Through every brushstroke, I aim to capture not just the visual splendor of our landscapes, 
            but the emotional depth that defines our heritage."
          </motion.blockquote>
          
          <motion.p 
            className="text-primary font-semibold text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            — Levan Mosiashvili
          </motion.p>

          <motion.div 
            className="mt-12 text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="mb-6">
              Born and raised in the heart of Georgia, Levan Mosiashvili has dedicated his life to capturing 
              the essence of Georgian culture through his art. His work spans traditional landscapes, 
              intricate portraits, and modern abstract pieces that reflect the evolving spirit of his homeland.
            </p>
            <p>
              With over two decades of artistic experience, Levan's paintings have been featured in galleries 
              across Europe and continue to inspire art lovers around the world.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
