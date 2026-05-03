import { motion } from 'framer-motion';
import { MapPin, Utensils, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Check if open based on current time and rules
    const checkOpenStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday...
      const hour = now.getHours();

      // Closed Tuesday (2) and Wednesday (3)
      if (day === 2 || day === 3) {
        setIsOpen(false);
        return;
      }

      // Summer hours for now (8h - 23h)
      if (hour >= 8 && hour < 23) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax effect */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/images/hero_terrace.png')",
          backgroundAttachment: "fixed" // Simple parallax
        }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-marine/70 via-marine/40 to-marine/80"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl flex flex-col items-center"
        >
          {/* Dynamic Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md border ${
              isOpen 
                ? 'bg-green-500/20 text-green-100 border-green-500/30' 
                : 'bg-red-500/20 text-red-100 border-red-500/30'
            }`}>
              <Clock size={16} />
              {isOpen ? "Ouvert aujourd'hui jusqu'à 23h" : "Fermé actuellement"}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-sable mb-4 drop-shadow-lg">
            L'arrêt au Port
          </motion.h1>

          {/* Subtitle */}
          <motion.div variants={itemVariants}>
            <p className="text-xl md:text-2xl lg:text-3xl font-light text-sable/90 mb-8 max-w-2xl mx-auto">
              Cuisine authentique au bord de l'eau
              <br />
              <span className="text-terracotta font-medium">Cagnes-sur-Mer</span>
            </p>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants}>
            <p className="text-base md:text-lg text-sable/80 mb-10 max-w-3xl mx-auto text-balance">
              Entre la plage et le port, découvrez une cuisine simple et généreuse élaborée avec des produits locaux, frais et de saison. Une vue imprenable sur la Méditerranée, une ambiance chaleureuse et décontractée.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a 
              href="#contact" 
              className="btn bg-terracotta hover:bg-terracotta/90 text-white border-none rounded-full px-8 py-3 text-lg h-auto shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <MapPin size={20} />
              Nous trouver
            </a>
            <a 
              href="#menu" 
              className="btn bg-sable hover:bg-white text-marine border-none rounded-full px-8 py-3 text-lg h-auto shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <Utensils size={20} />
              Voir la carte
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-[30px] h-[50px] border-2 border-sable/50 rounded-full flex justify-center p-2">
          <div className="w-1.5 h-3 bg-sable rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
}
