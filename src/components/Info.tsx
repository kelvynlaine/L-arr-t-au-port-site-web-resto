import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Phone, Accessibility, Car, Bus } from 'lucide-react';

export default function Info() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();

      if (day === 2 || day === 3) {
        setIsOpen(false);
        return;
      }

      if (hour >= 8 && hour < 23) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-marine mb-4"
          >
            Horaires & Accès
          </motion.h2>
          <div className="w-20 h-1 bg-terracotta mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Horaires */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-sable/30 p-8 md:p-10 rounded-3xl border border-marine/5"
          >
            <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-serif font-bold text-marine flex items-center gap-3">
                <Clock className="text-terracotta" />
                Horaires d'Ouverture
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {isOpen ? 'Ouvert maintenant' : 'Fermé'}
              </span>
            </motion.div>

            <motion.ul variants={itemVariants} className="space-y-4 mb-8">
              <li className="flex justify-between border-b border-marine/10 pb-2">
                <span className="font-medium text-marine">Lundi</span>
                <span className="text-marine/80">8h00 - 23h00</span>
              </li>
              <li className="flex justify-between border-b border-marine/10 pb-2 text-terracotta font-medium">
                <span>Mardi</span>
                <span>FERMÉ</span>
              </li>
              <li className="flex justify-between border-b border-marine/10 pb-2 text-terracotta font-medium">
                <span>Mercredi</span>
                <span>FERMÉ</span>
              </li>
              <li className="flex justify-between border-b border-marine/10 pb-2">
                <span className="font-medium text-marine">Jeudi</span>
                <span className="text-marine/80">8h00 - 23h00</span>
              </li>
              <li className="flex justify-between border-b border-marine/10 pb-2">
                <span className="font-medium text-marine">Vendredi</span>
                <span className="text-marine/80">8h00 - 23h00</span>
              </li>
              <li className="flex justify-between border-b border-marine/10 pb-2">
                <span className="font-medium text-marine">Samedi</span>
                <span className="text-marine/80">8h00 - 23h00</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium text-marine">Dimanche</span>
                <span className="text-marine/80">8h00 - 23h00</span>
              </li>
            </motion.ul>

            <motion.div variants={itemVariants} className="bg-white p-4 rounded-xl shadow-sm text-sm text-marine/80">
              <p className="mb-2">⚠️ <strong className="text-marine">Fermé le Mardi et le Mercredi</strong></p>
              <p>🌞 <strong className="text-marine">Été :</strong> 8h-23h | ❄️ <strong className="text-marine">Hiver :</strong> 8h-18h</p>
            </motion.div>
          </motion.div>

          {/* Accès & Contact */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col h-full"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-2xl font-serif font-bold text-marine mb-6 flex items-center gap-3">
                <MapPin className="text-terracotta" />
                Nous Trouver
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-sable rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-terracotta" />
                  </div>
                  <div>
                    <h4 className="font-bold text-marine mb-1">Adresse</h4>
                    <a 
                      href="https://www.google.com/maps/dir/?api=1&destination=Base+Nautique,+Cagnes-sur-Mer" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-marine/80 hover:text-terracotta transition-colors block"
                    >
                      Base Nautique<br/>Rue du Capitaine de Frégate Hippolyte Vial<br/>06800 Cagnes-sur-Mer, France
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-sable rounded-full flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-terracotta" />
                  </div>
                  <div>
                    <h4 className="font-bold text-marine mb-1">Téléphone</h4>
                    <a href="tel:+33610901578" className="text-terracotta hover:underline font-medium">+33 6 10 90 15 78</a>
                    <p className="text-xs text-marine/60 mt-1">Pas de réservation - Premier arrivé, premier servi !</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm text-marine/80">
                    <Accessibility size={16} className="text-vert-eau" /> Entrée PMR
                  </div>
                  <div className="flex items-center gap-2 text-sm text-marine/80">
                    <Car size={16} className="text-vert-eau" /> Parking à proximité
                  </div>
                  <div className="flex items-center gap-2 text-sm text-marine/80">
                    <Bus size={16} className="text-vert-eau" /> Arrêt de bus proche
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Google Maps iframe */}
            <motion.div variants={itemVariants} className="flex-grow min-h-[250px] bg-sable rounded-2xl overflow-hidden shadow-md relative group">
              <iframe 
                src="https://maps.google.com/maps?q=Base+Nautique,+Rue+du+Capitaine+de+Fr%C3%A9gate+Hippolyte+Vial,+06800+Cagnes-sur-Mer&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps L'arrêt au Port"
              ></iframe>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-90 group-hover:opacity-100 transition-opacity">
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Base+Nautique,+Cagnes-sur-Mer" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn bg-marine text-white border-none shadow-xl hover:bg-marine/90 hover:scale-105 transition-all rounded-full px-6"
                >
                  <MapPin size={18} className="mr-1" />
                  Calculer l'itinéraire
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
