
import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, Heart } from 'lucide-react';

export const ModernFooter = () => {
  return (
    <footer className="bg-card/50 border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h3 className="font-playfair text-3xl font-bold text-primary mb-2">
              Levan Mosiashvili
            </h3>
            <p className="text-muted-foreground italic">
              Georgian Artist • Painter • Cultural Ambassador
            </p>
          </div>

          <div className="flex justify-center space-x-6 mb-8">
            <motion.a
              href="https://www.facebook.com/levanmosiashviliart"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Facebook size={24} className="text-primary" />
            </motion.a>
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Instagram size={24} className="text-primary" />
            </motion.a>
            <motion.a
              href="mailto:info@levanmosiashvili.com"
              className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail size={24} className="text-primary" />
            </motion.a>
          </div>

          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 sm:mb-0">
              © 2024 Levan Mosiashvili. All rights reserved.
            </p>
            <motion.p 
              className="text-muted-foreground text-sm flex items-center gap-1"
              whileHover={{ scale: 1.02 }}
            >
              Made with <Heart size={16} className="text-red-500" /> by Sandro
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
