
import { motion } from 'framer-motion';
import { Mail, Facebook, Instagram, MapPin, Phone } from 'lucide-react';

export const ContactSection = () => {
  return (
    <section id="contact" className="py-20 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Interested in purchasing a piece or commissioning custom artwork? 
            Let's discuss how we can bring Georgian art into your space.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-playfair text-2xl font-semibold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <motion.div 
                className="flex items-center gap-4"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <Mail className="text-primary" size={24} />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:info@levanmosiashvili.com" className="text-muted-foreground hover:text-primary transition-colors">
                    info@levanmosiashvili.com
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-4"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <Phone className="text-primary" size={24} />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">+995 555 123 456</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-4"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <MapPin className="text-primary" size={24} />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">Tbilisi, Georgia</p>
                </div>
              </motion.div>
            </div>

            <div className="pt-6">
              <h4 className="font-semibold mb-4">Follow My Work</h4>
              <div className="flex space-x-4">
                <motion.a
                  href="https://www.facebook.com/levanmosiashviliart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Facebook size={24} className="text-primary" />
                </motion.a>
                <motion.a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram size={24} className="text-primary" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-card border border-border rounded-lg p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-playfair text-2xl font-semibold mb-6">Send a Message</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
