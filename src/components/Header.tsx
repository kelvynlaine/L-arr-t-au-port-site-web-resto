import { useState, useEffect } from 'react';
import { Anchor, Menu, X, Star, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'Notre Histoire', href: '#about' },
    { name: 'Carte', href: '#menu' },
    { name: 'Galerie', href: '#gallery' },
    { name: 'Avis', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/20 dark:bg-marine/30 backdrop-blur-sm border-b border-white/30 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, '#home')}
            className={`flex items-center gap-2 text-2xl font-serif font-bold transition-colors ${
              isScrolled ? 'text-marine dark:text-white' : 'text-sable dark:text-white drop-shadow-md'
            }`}
          >
            <Anchor className={isScrolled ? 'text-terracotta' : 'text-sable'} size={28} />
            <span>L'arrêt au Port</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className={`text-sm font-medium hover:text-terracotta transition-colors ${
                      isScrolled ? 'text-marine' : 'text-sable drop-shadow'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <div className="hidden xl:flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30 text-xs font-semibold">
                <span className={isScrolled ? 'text-marine' : 'text-sable'}>4.5</span>
                <Star className="text-yellow-400 fill-current" size={14} />
                <span className={`opacity-80 ${isScrolled ? 'text-marine' : 'text-sable'}`}>
                  (1 389 avis)
                </span>
              </div>
              <a
                href="tel:+33610901578"
                className="btn btn-primary rounded-full hover:scale-105 transition-transform"
              >
                <Phone size={18} />
                Nous appeler
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-marine bg-sable/80 rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white/30 backdrop-blur-sm shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] border-b border-white/40 lg:hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className="text-lg font-medium text-marine hover:text-terracotta block py-2 border-b border-marine/10"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm text-xs font-semibold text-marine">
                  <span>4.5</span>
                  <Star className="text-yellow-400 fill-current" size={14} />
                  <span className="opacity-80">(1 389 avis Google)</span>
                </div>
              </div>
              
              <a
                href="tel:+33610901578"
                className="btn btn-primary w-full mt-2"
              >
                <Phone size={18} />
                +33 6 10 90 15 78
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
