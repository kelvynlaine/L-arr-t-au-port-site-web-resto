import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Info from './components/Info';
import Footer from './components/Footer';
import { AppProvider, useAppContext } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <HelmetProvider>
        <AppContent />
      </HelmetProvider>
    </AppProvider>
  );
}

function AppContent() {
  const { language } = useAppContext();
  
  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "L'arrêt au Port",
    "image": "https://larretauport.com/images/hero_terrace.png",
    "url": "https://larretauport.com",
    "telephone": "+33610901578",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Base Nautique, Rue du Capitaine de Frégate Hippolyte Vial",
      "addressLocality": "Cagnes-sur-Mer",
      "postalCode": "06800",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.6482,
      "longitude": 7.1645
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "23:00"
      }
    ],
    "priceRange": "€20-30"
  };

  return (
    <div className="font-sans text-marine dark:text-sable bg-sable dark:bg-marine transition-colors duration-300">
      <Helmet>
        <title>{language === 'fr' ? "L'arrêt au Port - Restaurant bord de mer à Cagnes-sur-Mer" : "L'arrêt au Port - Seaside Restaurant in Cagnes-sur-Mer"}</title>
        <meta name="description" content={language === 'fr' ? "L'arrêt au Port - Restaurant en bord de mer à Cagnes-sur-Mer. Cuisine authentique, produits frais et locaux, terrasse avec vue imprenable sur la Méditerranée." : "L'arrêt au Port - Seaside restaurant in Cagnes-sur-Mer. Authentic cuisine, fresh and local products, terrace with breathtaking views of the Mediterranean."} />
        <meta name="keywords" content="restaurant Cagnes-sur-Mer, seaside restaurant, sea view terrace, mediterranean cuisine, L'arrêt au Port" />
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>
      </Helmet>

      <Header />
      
      <main>
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Reviews />
        <Info />
      </main>

      <Footer />
    </div>
  );
}

export default App;
