import { Anchor, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-marine text-sable pt-16 pb-8 border-t-4 border-terracotta">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1 */}
          <div>
            <div className="flex items-center gap-2 text-2xl font-serif font-bold text-white mb-6">
              <Anchor className="text-terracotta" size={28} />
              <span>L'arrêt au Port</span>
            </div>
            <p className="text-sable/80 mb-6 text-sm leading-relaxed">
              L'authenticité méditerranéenne au bord de l'eau. Cuisine simple, fraîche et généreuse à Cagnes-sur-Mer.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-terracotta hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-terracotta hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-lg text-white mb-6 font-serif">Liens Rapides</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-sable/80 hover:text-terracotta transition-colors">Accueil</a></li>
              <li><a href="#menu" className="text-sable/80 hover:text-terracotta transition-colors">Notre Carte</a></li>
              <li><a href="#gallery" className="text-sable/80 hover:text-terracotta transition-colors">Galerie</a></li>
              <li><a href="#reviews" className="text-sable/80 hover:text-terracotta transition-colors">Avis Clients</a></li>
              <li><a href="#contact" className="text-sable/80 hover:text-terracotta transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-bold text-lg text-white mb-6 font-serif">Infos Pratiques</h4>
            <ul className="space-y-3 text-sm text-sable/80">
              <li><strong>Lun - Dim :</strong> 8h - 23h (Été)</li>
              <li className="text-terracotta"><strong>Mar - Mer :</strong> Fermé</li>
              <li className="pt-2">
                <a href="tel:+33610901578" className="text-white hover:text-terracotta transition-colors font-medium text-base">
                  +33 6 10 90 15 78
                </a>
              </li>
              <li className="italic">Sans réservation</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-bold text-lg text-white mb-6 font-serif">Nous Trouver</h4>
            <a 
              href="https://maps.google.com/?q=Base+Nautique+Cagnes-sur-Mer" 
              target="_blank" 
              rel="noreferrer"
              className="block group"
            >
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 hover:bg-white/10 hover:border-terracotta/50 transition-all cursor-pointer">
                <div className="bg-terracotta/20 p-3 rounded-full text-terracotta group-hover:bg-terracotta group-hover:text-white transition-colors">
                  <MapPin size={24} />
                </div>
                <div>
                  <h5 className="font-bold text-white mb-1">Ouvrir dans Maps</h5>
                  <p className="text-xs text-sable/60">Base Nautique, Cagnes-sur-Mer</p>
                </div>
              </div>
            </a>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-sable/60">
          <p>© 2025 L'arrêt au Port - Tous droits réservés.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
