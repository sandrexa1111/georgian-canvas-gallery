
import { motion } from 'framer-motion';

export const AboutSection = () => {
  return (
    <section id="about" className="section-spacing min-h-screen flex items-center bg-background">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div 
          className="text-center space-y-20"
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
            <h2 className="font-playfair text-5xl md:text-7xl font-semibold text-foreground">
              About the <span className="text-primary">Artist</span>
            </h2>
          </motion.div>
          
          <motion.blockquote 
            className="text-2xl md:text-4xl lg:text-5xl font-playfair italic text-foreground/80 leading-relaxed max-w-5xl mx-auto"
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
            className="text-foreground font-semibold text-2xl font-inter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            — Levan Mosiashvili
          </motion.p>

          <motion.div 
            className="mt-24 text-left max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="space-y-6">
              <p className="text-lg text-foreground/70 font-inter leading-relaxed">
                Levan Mosiashvili was born in 1971 in Tbilisi. In 1993 he graduated from the Forestry Faculty of the Georgian Agrarian University, while simultaneously studying the profession of theater director. In 1996 he received the degree of Candidate of Biological Sciences from the Tbilisi State Agrarian University.
              </p>
              
              <p className="text-lg text-foreground/70 font-inter leading-relaxed">
                Drawing has been his calling since childhood, even during the communist period, he has received honorary awards and diplomas. He is a self-taught artist and he works with different kind of techniques on canvases. He already has 4 types of art periods: Georgian, French, Modern and abstract.
              </p>
              
              <p className="text-lg text-foreground/70 font-inter leading-relaxed">
                As a result of winning many international art competitions, he left Georgia in 2008, by the suggestion of the French government and became the first Georgian to be granted the status of a talent passport. Since then, he has been living in Tbilisi and southern France. Levan's winnings successfully continued in Europe.
              </p>
              
              <p className="text-lg text-foreground/70 font-inter leading-relaxed">
                Mosiashvili's works are preserved in private collections and galleries in many countries: Georgia, France, Russia, USA, Germany, Switzerland, Italy, Uruguay, Venezuela, Japan, Canada, New Zealand, Australia, Turkey, Belgium, England, Brazil, Chile, Sweden, Norway, China. In most of them, he had group and personal exhibitions.
              </p>
              
              <p className="text-lg text-foreground/70 font-inter leading-relaxed">
                His works have been presented as gifts to presidents and state officials of several countries on behalf of the Georgian state. Levan Mosiashvili is the co-founder and administrator of the French-Georgian cultural association "Georgia Center", and has also been the head of the International Club of Friends of the National Library of the Parliament of Georgia since 2015.
              </p>
              
              <p className="text-lg text-foreground/70 font-inter leading-relaxed">
                He regularly participates in charity auctions and donates royalties to various beneficiaries. Latest exhibitions and participations were held at "art Dubai 2022" and "Art New York 2023" where one of his painting was awarded between twelve best worldwide artists, his painting was awarded as a one of the most successful painting of the year.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
