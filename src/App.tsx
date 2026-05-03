import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Info from './components/Info';
import Footer from './components/Footer';

function App() {
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
    <HelmetProvider>
      <div className="font-sans text-marine bg-sable">
        <Helmet>
          <title>L'arrêt au Port - Restaurant bord de mer à Cagnes-sur-Mer</title>
          <meta name="description" content="L'arrêt au Port - Restaurant en bord de mer à Cagnes-sur-Mer. Cuisine authentique, produits frais et locaux, terrasse avec vue imprenable sur la Méditerranée. Ouvert tous les jours sauf mardi et mercredi." />
          <meta name="keywords" content="restaurant Cagnes-sur-Mer, restaurant bord de mer, terrasse vue mer, cuisine méditerranéenne, petit-déjeuner Cagnes-sur-Mer, restaurant plage, L'arrêt au Port" />
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
    </HelmetProvider>
  );
}

export default App;
