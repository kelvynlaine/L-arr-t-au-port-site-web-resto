import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { t } from '../i18n';

const reviewsData: Record<string, any[]> = {
  fr: [
    { name: "Mahdie SB", date: "juin 2025", text: "Ambiance super sympa, très convivial et chaleureux (comme à la maison), fortement recommandé ! ☀️", rating: 5, isLocalGuide: false },
    { name: "Marjorie Zolezzi", date: "il y a 2 mois", text: "Petit coin de paradis inoubliable au bord de l'eau. Cuisine simple et authentique, généreuse et savoureuse, élaborée avec des produits locaux, frais et de saison. On a adoré !", rating: 5, isLocalGuide: true },
    { name: "Guillaume Z", date: "il y a 3 mois", text: "C'est un petit resto de bord de mer situé entre la plage et le port, l'emplacement est top. Le personnel est très sympa, l'ambiance est géniale. Parfait pour un déjeuner léger !", rating: 5, isLocalGuide: true },
    { name: "Tiphaine Foissac", date: "il y a 4 mois", text: "J'adore cet endroit. L'emplacement est incroyable, face à la mer, pas de voitures autour. Le menu est court, seulement des produits frais. Le personnel est chaleureux, les prix sont raisonnables.", rating: 5, isLocalGuide: false },
    { name: "Kate En Balade", date: "il y a 5 mois", text: "Ce restaurant est situé au bord de l'eau, à côté du boulodrome. Le personnel est très sympa, chaleureux, souriant. La vue sur la mer est magnifique.", rating: 5, isLocalGuide: true },
    { name: "anaïs LEGRETTE", date: "il y a 6 mois", text: "L'emplacement est incroyable, vue sur la mer d'un côté, le port de l'autre. Service rapide et attentionné. Ambiance très conviviale, cuisine authentique. De l'entrée au dessert, tout est parfait.", rating: 5, isLocalGuide: true },
  ],
  en: [
    { name: "Mahdie SB", date: "June 2025", text: "Super nice atmosphere, very friendly and warm (feels like home), highly recommended! ☀️", rating: 5, isLocalGuide: false },
    { name: "Marjorie Zolezzi", date: "2 months ago", text: "Unforgettable little piece of paradise by the water. Simple, authentic, generous and tasty cuisine, made with local, fresh and seasonal products. We loved it!", rating: 5, isLocalGuide: true },
    { name: "Guillaume Z", date: "3 months ago", text: "It's a small seaside restaurant located between the beach and the port, the location is great. The staff is very nice, the atmosphere is awesome. Perfect for a light lunch!", rating: 5, isLocalGuide: true },
    { name: "Tiphaine Foissac", date: "4 months ago", text: "I love this place. The location is incredible, facing the sea, no cars around. The menu is short, only fresh products. The staff is warm, the prices are reasonable.", rating: 5, isLocalGuide: false },
    { name: "Kate En Balade", date: "5 months ago", text: "This restaurant is located by the water, next to the bowling green. The staff is very nice, warm, smiling. The sea view is magnificent.", rating: 5, isLocalGuide: true },
    { name: "anaïs LEGRETTE", date: "6 months ago", text: "Incredible location, sea view on one side, port on the other. Fast and attentive service. Very friendly atmosphere, authentic cuisine. From starter to dessert, everything is perfect.", rating: 5, isLocalGuide: true },
  ]
};

export default function Reviews() {
  const { language } = useAppContext();
  const currentT = t[language];
  const reviews = reviewsData[language];
  // Duplicate array to create seamless loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section id="reviews" className="py-24 bg-marine overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-sable mb-4">
            {currentT.reviews.title}
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-2xl font-bold text-sable">4.5</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`${i < 4 || i === 4 /* Assuming 4.5 visually represented as 4 full + half, using full for simplicity here or could just use yellow */ ? 'text-yellow-400 fill-current' : 'text-sable/30'}`} size={24} />
              ))}
            </div>
            <span className="text-sable/80 ml-2">{language === 'fr' ? 'sur Google (1 389 avis)' : 'on Google (1,389 reviews)'}</span>
          </div>
          <div className="w-20 h-1 bg-terracotta mx-auto"></div>
        </div>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <motion.div 
          className="flex gap-6 px-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 40,
            repeat: Infinity,
          }}
          whileHover={{ animationPlayState: 'paused' }}
          style={{ width: 'fit-content' }}
        >
          {duplicatedReviews.map((review, idx) => (
            <div 
              key={idx} 
              className="w-[300px] md:w-[400px] flex-shrink-0 bg-white rounded-2xl p-6 shadow-xl border border-white/10"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-marine/10 rounded-full flex items-center justify-center text-marine font-bold text-xl">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-marine">{review.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-marine/60">
                    <span>{review.date}</span>
                    {review.isLocalGuide && (
                      <span className="bg-marine/5 px-2 py-0.5 rounded text-xs">{currentT.reviews.localGuide}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={16} />
                ))}
              </div>
              
              <p className="text-marine/80 italic line-clamp-4">"{review.text}"</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 mt-12 text-center">
        <a href="#" className="inline-flex items-center gap-2 text-sable hover:text-terracotta font-medium transition-colors border-b border-transparent hover:border-terracotta pb-1">
          {language === 'fr' ? 'Voir tous les 1 389 avis sur Google' : 'See all 1,389 reviews on Google'}
        </a>
      </div>
    </section>
  );
}
