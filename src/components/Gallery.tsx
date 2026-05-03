import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const galleryItems = [
  { id: 1, src: '/images/hero_terrace.png', category: 'La Terrasse', title: 'Vue depuis la terrasse' },
  { id: 2, src: '/images/menu_pasta.png', category: 'Les Plats', title: 'Pâtes au pesto maison' },
  { id: 3, src: '/images/menu_breakfast.png', category: 'Les Desserts', title: 'Petit-déjeuner au soleil' }, // Assuming it fits
  { id: 4, src: '/images/menu_board.png', category: 'Les Plats', title: 'Planche apéritive' },
  { id: 5, src: '/images/view_port.png', category: 'La Vue', title: 'Vue sur le port' },
  { id: 6, src: '/images/about_story.png', category: 'La Terrasse', title: 'Coucher de soleil' },
];

const categories = ['Toutes', 'La Terrasse', 'Les Plats', 'La Vue', 'Les Desserts'];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('Toutes');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredItems = activeCategory === 'Toutes' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-24 bg-sable/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-marine mb-4"
          >
            L'Ambiance
          </motion.h2>
          <div className="w-20 h-1 bg-terracotta mx-auto mt-6 mb-8"></div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-marine text-white' 
                    : 'bg-white text-marine border border-marine/10 hover:border-marine/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="relative aspect-square md:aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(item.src)}
              >
                <img 
                  src={item.src} 
                  alt={item.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-marine/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                  <ZoomIn className="text-white mb-2" size={32} />
                  <span className="text-white font-medium px-4 text-center">{item.title}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-marine/95 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-terracotta transition-colors"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage} 
              alt="Agrandissement" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
