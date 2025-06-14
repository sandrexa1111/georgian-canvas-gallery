
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export const ScrollNavigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.8)"]
  );

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-border"
      style={{ backgroundColor }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="font-playfair text-2xl font-bold text-primary cursor-pointer"
            onClick={() => scrollToSection('home')}
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 20px rgba(255, 255, 255, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Levan Mosiashvili
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative ${
                  activeSection === item.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    animate={{
                      boxShadow: [
                        "0 0 5px rgba(255, 255, 255, 0.3)",
                        "0 0 15px rgba(255, 255, 255, 0.6)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors relative overflow-hidden"
            whileHover={{ 
              scale: 1.1,
              backgroundColor: "rgba(255, 255, 255, 0.1)"
            }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                background: [
                  "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                  "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)"
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
            <motion.div
              animate={{ rotate: theme === 'dark' ? 0 : 180 }}
              transition={{ duration: 0.5 }}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};
