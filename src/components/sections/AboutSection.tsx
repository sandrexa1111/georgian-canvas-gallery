
import { motion } from 'framer-motion';

export const AboutSection = () => {
  return (
    <section id="about" className="section-spacing min-h-screen flex items-center section-black">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div 
          className="text-center space-y-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-5xl md:text-7xl font-semibold text-white">
              About the <span className="text-primary">Artist</span>
            </h2>
          </motion.div>
          
          <motion.blockquote 
            className="text-2xl md:text-4xl lg:text-5xl font-playfair italic text-gray-300 leading-relaxed max-w-5xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            "Art is the bridge between the soul of Georgia and the hearts of those who witness its beauty. 
            Through every brushstroke, I aim to capture not just the visual splendor of our landscapes, 
            but the emotional depth that defines our heritage."
          </motion.blockquote>
          
          <motion.p 
            className="text-primary font-semibold text-2xl font-dm-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            — Levan Mosiashvili
          </motion.p>

          <motion.div 
            className="grid md:grid-cols-2 gap-16 mt-24 text-left"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="space-y-8">
              <h3 className="font-playfair text-3xl font-semibold text-white">Heritage & Vision</h3>
              <p className="text-lg text-gray-300 font-inter leading-relaxed">
                Born and raised in the heart of Georgia, Levan Mosiashvili has dedicated his life to capturing 
                the essence of Georgian culture through his art. His work spans traditional landscapes, 
                intricate portraits, and modern abstract pieces that reflect the evolving spirit of his homeland.
              </p>
            </div>
            
            <div className="space-y-8">
              <h3 className="font-playfair text-3xl font-semibold text-white">Recognition & Impact</h3>
              <p className="text-lg text-gray-300 font-inter leading-relaxed">
                With over two decades of artistic experience, Levan's paintings have been featured in galleries 
                across Europe and continue to inspire art lovers around the world, bridging cultural divides 
                through the universal language of visual expression.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
