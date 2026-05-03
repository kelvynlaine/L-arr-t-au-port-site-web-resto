import { motion } from 'framer-motion';
import { Waves, ChefHat, Leaf, Sun, Accessibility, Dog } from 'lucide-react';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const features = [
    { icon: <Waves className="text-terracotta" />, text: "Vue mer imprenable" },
    { icon: <ChefHat className="text-terracotta" />, text: "Cuisine faite maison" },
    { icon: <Leaf className="text-terracotta" />, text: "Produits locaux & frais" },
    { icon: <Sun className="text-terracotta" />, text: "Terrasse en plein air" },
    { icon: <Accessibility className="text-terracotta" />, text: "Accessible PMR" },
    { icon: <Dog className="text-terracotta" />, text: "Animaux acceptés" },
  ];

  return (
    <section id="about" className="py-24 bg-sable dark:bg-marine relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative">
              <img 
                src="/images/about_story.png" 
                alt="Ambiance coucher de soleil à L'arrêt au Port" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-marine/10"></div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-vert-eau/20 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-terracotta/20 rounded-full blur-2xl -z-10"></div>
          </motion.div>

          {/* Text Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-serif font-bold text-marine dark:text-sable mb-6">
              Notre Histoire
            </motion.h2>
            
            <motion.div variants={itemVariants} className="w-20 h-1 bg-terracotta mb-8"></motion.div>

            <motion.div variants={itemVariants} className="space-y-6 text-lg text-marine/80 dark:text-sable/80">
              <p>
                <strong>L'arrêt au Port</strong>, c'est avant tout une histoire de passion et d'authenticité. Niché à la Base Nautique de Cagnes-sur-Mer, entre la plage de galets et le petit port pittoresque, notre restaurant vous accueille dans un cadre exceptionnel, face à la mer Méditerranée.
              </p>
              <p>
                Notre philosophie est simple : une carte courte, des produits frais et locaux, une cuisine faite maison du petit-déjeuner au dessert. Pas de prétention, juste le plaisir de bien manger les pieds presque dans l'eau.
              </p>
              <p className="font-medium italic text-marine dark:text-sable">
                "Ici, pas de réservation possible - premier arrivé, premier servi ! Et oui, on tutoie tout le monde, c'est comme ça chez nous. Venez comme vous êtes, avec votre maillot sous le t-shirt et le sourire aux lèvres."
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="mt-10 grid grid-cols-2 gap-4"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-white/10 rounded-lg shadow-sm border border-marine/5 dark:border-white/10">
                    {feature.icon}
                  </div>
                  <span className="font-medium text-marine/90 dark:text-sable/90">{feature.text}</span>
                </div>
              ))}
            </motion.div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
}
