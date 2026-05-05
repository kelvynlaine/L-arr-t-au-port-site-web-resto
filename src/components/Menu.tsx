import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useAppContext } from '../context/AppContext';
import { t } from '../i18n';

type MenuItem = {
  name: string;
  desc?: string;
  price: string;
};

type MenuCategory = {
  id: string;
  label: string;
  items: MenuItem[];
};

const menuData: Record<string, MenuCategory[]> = {
  fr: [
    {
      id: "petits-dejeuners",
      label: "Petits Déjeuners",
      items: [
        { name: "L'Express", desc: "Café + expresso + une viennoiserie", price: "3.50€" },
        { name: "Le Tradi'", desc: "Café/cappuccino + jus d'orange + tartines + beurre/confiture", price: "9.50€" },
        { name: "Le Salé", desc: "Café/cappuccino + oeufs brouillés/bacon/fromage + tartines", price: "12.00€" },
        { name: "Le Petit Déj' du Chat", desc: "Café/cappuccino + oeufs sur le plat/bacon/saucisses + tartines + fromage + yaourt + fruits", price: "21.00€" },
      ]
    },
    {
      id: "salades",
      label: "Salades",
      items: [
        { name: "La Buffala", desc: "Mozzarella di bufala, tomates, basilic, crème de balsamique", price: "14.00€" },
        { name: "La Burrata", desc: "Burrata, tomates, mozza, crème de balsamique", price: "15.00€" },
        { name: "La Nissart", desc: "Thon, anchois, tomates, poivrons, oeufs, oignons, olives, vinaigrette", price: "17.50€" },
        { name: "La Seguin", desc: "Chèvre chaud, jambon cru, tomates, miel", price: "16.50€" },
        { name: "La Roma / La Romarrata", desc: "Jambon cru, mozzarella di bufala, tomates, basilic", price: "18.50€ / 19.50€" },
        { name: "La Famoza / La Famorrata", desc: "Jambon cru, mozzarella, tomates confites, pesto, burrata", price: "18.50€ / 19.50€" },
      ]
    },
    {
      id: "sandwichs",
      label: "Sandwichs (12h-15h)",
      items: [
        { name: "Le Basic", desc: "Jambon/fromage/beurre", price: "6.00€" },
        { name: "Le Choix du Chat", desc: "Chorizo/mozzarella/chèvre/beurre", price: "6.50€" },
        { name: "Le Classic", desc: "Thon/mozzarella/tomates/salade/fromage", price: "8.00€" },
        { name: "Le Pan Bagnat", desc: "Thon/anchois/tomates/poivrons/oeufs/basilic", price: "8.50€" },
        { name: "Le Croq'Salade", desc: "Jambon cru/fromage/béchamel/salade", price: "12.00€" },
      ]
    },
    {
      id: "focaccia",
      label: "Focaccia",
      items: [
        { name: "La Mozza", desc: "Mozzarella, tomates, pesto, huile d'olive", price: "13.00€" },
        { name: "La Parma", desc: "Jambon cru, pecorino, tomates séchées, fromage frais", price: "14.50€" },
        { name: "La Tartuffa", desc: "Jambon cru, fromage frais, tomates, truffade", price: "15.00€" },
      ]
    },
    {
      id: "planches",
      label: "Planches Apéro",
      items: [
        { name: "Pitchoun Saucisson", desc: "Saucisson sec", price: "6.00€" },
        { name: "La Gorgonzola", desc: "Gorgonzola, noix, miel", price: "7.00€" },
        { name: "Tapenade de Truffe", desc: "Tapenade noire/truffe", price: "5.50€" },
        { name: "Duo Tapenade & Anchoïade", desc: "", price: "7.00€" },
        { name: "L'Assiette d'Anchois Marinés", desc: "", price: "7.50€" },
        { name: "La Fromagère", desc: "Sélection de fromages", price: "10.50€" },
        { name: "La Terrine", desc: "Terrine du moment", price: "8.50€" },
        { name: "La Rillette au Foie Gras", desc: "", price: "11.00€" },
      ]
    },
    {
      id: "desserts",
      label: "Desserts & Glaces",
      items: [
        { name: "Gaufre au Sucre", desc: "", price: "6.50€" },
        { name: "Gaufre Confiture / Sirop d'Erable / Caramel / Nocciolata", desc: "", price: "7.00€" },
        { name: "Desserts Maison", desc: "À la française, selon arrivage", price: "7.00€ - 10.00€" },
        { name: "Coupe du Chat", desc: "3 boules au choix, chantilly, coulis", price: "11.00€" },
        { name: "Café / Chocolat Liégeois", desc: "", price: "11.00€ / 12.00€" },
        { name: "Coupe Colonel", desc: "Vodka, citron vert, sorbet", price: "12.00€" },
        { name: "Glaces", desc: "1 Parfum 3.50€ / 2 Parfums 5.50€ / 3 Parfums 7.50€", price: "Dès 3.50€" },
      ]
    },
    {
      id: "boissons",
      label: "Boissons",
      items: [
        { name: "Café / Noisette", desc: "", price: "2.00€ / 2.50€" },
        { name: "Thé / Infusions", desc: "Menthe, Vert, Noir, Rooibos, Fruits Rouges", price: "4.00€" },
        { name: "Soda", desc: "Coca, Perrier, Schweppes", price: "5.00€" },
        { name: "Jus de Fruits Bio", desc: "Orange, Citron, Carotte, Pomme", price: "4.50€ / 6.00€" },
        { name: "Sirop à l'Eau", desc: "Plusieurs saveurs", price: "3.50€" },
        { name: "Eaux Minérales", desc: "50cl / 1L", price: "3.50€ / 7.00€" },
      ]
    },
    {
      id: "bieres-aperitifs",
      label: "Bières & Apéritifs",
      items: [
        { name: "Bière Pression", desc: "Demi 25cl / Pinte 50cl", price: "4.50€ / 8.00€" },
        { name: "Artisanale de Nice / Mont Blanc", desc: "Bouteille", price: "7.00€" },
        { name: "Verre de Vin", desc: "Rouge / Rosé / Blanc", price: "4.50€" },
        { name: "Coupe Prosecco / Champagne", desc: "", price: "6.50€ / 10.00€" },
        { name: "Aperol Spritz", desc: "", price: "9.50€" },
        { name: "Saint Germain Spritz", desc: "", price: "12.00€" },
        { name: "Americano, Porto, Martini", desc: "", price: "6.50€ - 9.50€" },
      ]
    }
  ],
  en: [
    {
      id: "petits-dejeuners",
      label: "Breakfast",
      items: [
        { name: "L'Express", desc: "Coffee + espresso + a pastry", price: "3.50€" },
        { name: "Le Tradi'", desc: "Coffee/cappuccino + orange juice + toasts + butter/jam", price: "9.50€" },
        { name: "Le Salé", desc: "Coffee/cappuccino + scrambled eggs/bacon/cheese + toasts", price: "12.00€" },
        { name: "Le Petit Déj' du Chat", desc: "Coffee/cappuccino + fried eggs/bacon/sausages + toasts + cheese + yogurt + fruits", price: "21.00€" },
      ]
    },
    {
      id: "salades",
      label: "Salads",
      items: [
        { name: "La Buffala", desc: "Buffalo mozzarella, tomatoes, basil, balsamic cream", price: "14.00€" },
        { name: "La Burrata", desc: "Burrata, tomatoes, mozzarella, balsamic cream", price: "15.00€" },
        { name: "La Nissart", desc: "Tuna, anchovies, tomatoes, peppers, eggs, onions, olives, vinaigrette", price: "17.50€" },
        { name: "La Seguin", desc: "Warm goat cheese, raw ham, tomatoes, honey", price: "16.50€" },
        { name: "La Roma / La Romarrata", desc: "Raw ham, buffalo mozzarella, tomatoes, basil", price: "18.50€ / 19.50€" },
        { name: "La Famoza / La Famorrata", desc: "Raw ham, mozzarella, sun-dried tomatoes, pesto, burrata", price: "18.50€ / 19.50€" },
      ]
    },
    {
      id: "sandwichs",
      label: "Sandwiches (12pm-3pm)",
      items: [
        { name: "Le Basic", desc: "Ham/cheese/butter", price: "6.00€" },
        { name: "Le Choix du Chat", desc: "Chorizo/mozzarella/goat cheese/butter", price: "6.50€" },
        { name: "Le Classic", desc: "Tuna/mozzarella/tomatoes/salad/cheese", price: "8.00€" },
        { name: "Le Pan Bagnat", desc: "Tuna/anchovies/tomatoes/peppers/eggs/basil", price: "8.50€" },
        { name: "Le Croq'Salade", desc: "Raw ham/cheese/béchamel/salad", price: "12.00€" },
      ]
    },
    {
      id: "focaccia",
      label: "Focaccia",
      items: [
        { name: "La Mozza", desc: "Mozzarella, tomatoes, pesto, olive oil", price: "13.00€" },
        { name: "La Parma", desc: "Raw ham, pecorino, sun-dried tomatoes, cream cheese", price: "14.50€" },
        { name: "La Tartuffa", desc: "Raw ham, cream cheese, tomatoes, truffade", price: "15.00€" },
      ]
    },
    {
      id: "planches",
      label: "Aperitif Boards",
      items: [
        { name: "Pitchoun Saucisson", desc: "Dry sausage", price: "6.00€" },
        { name: "La Gorgonzola", desc: "Gorgonzola, walnuts, honey", price: "7.00€" },
        { name: "Tapenade de Truffe", desc: "Black/truffle tapenade", price: "5.50€" },
        { name: "Duo Tapenade & Anchoïade", desc: "", price: "7.00€" },
        { name: "L'Assiette d'Anchois Marinés", desc: "", price: "7.50€" },
        { name: "La Fromagère", desc: "Cheese selection", price: "10.50€" },
        { name: "La Terrine", desc: "Terrine of the moment", price: "8.50€" },
        { name: "La Rillette au Foie Gras", desc: "", price: "11.00€" },
      ]
    },
    {
      id: "desserts",
      label: "Desserts & Ice Creams",
      items: [
        { name: "Gaufre au Sucre", desc: "Sugar waffle", price: "6.50€" },
        { name: "Gaufre Confiture / Sirop d'Erable / Caramel / Nocciolata", desc: "Jam / Maple syrup / Caramel / Nocciolata waffle", price: "7.00€" },
        { name: "Desserts Maison", desc: "Homemade desserts, depending on arrival", price: "7.00€ - 10.00€" },
        { name: "Coupe du Chat", desc: "3 scoops of your choice, whipped cream, coulis", price: "11.00€" },
        { name: "Café / Chocolat Liégeois", desc: "", price: "11.00€ / 12.00€" },
        { name: "Coupe Colonel", desc: "Vodka, lime, sorbet", price: "12.00€" },
        { name: "Glaces", desc: "1 Flavor 3.50€ / 2 Flavors 5.50€ / 3 Flavors 7.50€", price: "From 3.50€" },
      ]
    },
    {
      id: "boissons",
      label: "Drinks",
      items: [
        { name: "Café / Noisette", desc: "Coffee / Macchiato", price: "2.00€ / 2.50€" },
        { name: "Thé / Infusions", desc: "Mint, Green, Black, Rooibos, Red Fruits", price: "4.00€" },
        { name: "Soda", desc: "Coke, Perrier, Schweppes", price: "5.00€" },
        { name: "Jus de Fruits Bio", desc: "Organic juice: Orange, Lemon, Carrot, Apple", price: "4.50€ / 6.00€" },
        { name: "Sirop à l'Eau", desc: "Multiple flavors", price: "3.50€" },
        { name: "Eaux Minérales", desc: "Mineral Water 50cl / 1L", price: "3.50€ / 7.00€" },
      ]
    },
    {
      id: "bieres-aperitifs",
      label: "Beers & Aperitifs",
      items: [
        { name: "Bière Pression", desc: "Draft beer 25cl / 50cl", price: "4.50€ / 8.00€" },
        { name: "Artisanale de Nice / Mont Blanc", desc: "Bottle", price: "7.00€" },
        { name: "Verre de Vin", desc: "Glass of Wine (Red / Rosé / White)", price: "4.50€" },
        { name: "Coupe Prosecco / Champagne", desc: "", price: "6.50€ / 10.00€" },
        { name: "Aperol Spritz", desc: "", price: "9.50€" },
        { name: "Saint Germain Spritz", desc: "", price: "12.00€" },
        { name: "Americano, Porto, Martini", desc: "", price: "6.50€ - 9.50€" },
      ]
    }
  ]
};

export default function Menu() {
  const { language } = useAppContext();
  const currentT = t[language];
  const currentMenuData = menuData[language];
  const [activeTab, setActiveTab] = useState(currentMenuData[0].id);

  const activeCategory = currentMenuData.find(c => c.id === activeTab);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id="menu" className="py-24 bg-sable/40 dark:bg-marine relative overflow-hidden transition-colors duration-300">
      {/* Animated Background blobs for glassmorphism */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-terracotta/20 dark:bg-terracotta/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-vert-eau/20 dark:bg-vert-eau/10 rounded-full blur-[120px] -z-10 opacity-70"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-marine/5 dark:bg-sable/5 rounded-full blur-[150px] -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-marine dark:text-sable mb-4"
          >
            {currentT.menu.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-marine/70 dark:text-sable/70"
          >
            {currentT.menu.subtitle}
          </motion.p>
          <div className="w-20 h-1 bg-terracotta mx-auto mt-6"></div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 relative z-10">
          {currentMenuData.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                activeTab === category.id
                  ? 'bg-white/40 dark:bg-white/10 text-marine dark:text-sable border-white/60 dark:border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] scale-105 font-bold'
                  : 'bg-white/20 dark:bg-transparent text-marine/80 dark:text-sable/80 border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-white/5 hover:text-marine dark:hover:text-sable shadow-[0_4px_16px_0_rgba(31,38,135,0.05)]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="max-w-4xl mx-auto min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              className="grid md:grid-cols-2 gap-6"
            >
              {activeCategory?.items.map((item, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className="p-6 rounded-2xl border border-white/40 dark:border-white/10 bg-white/20 dark:bg-white/5 backdrop-blur-sm shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] dark:hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:border-white/60 dark:hover:border-white/20 hover:bg-white/30 dark:hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="font-serif font-bold text-lg text-marine dark:text-white group-hover:text-terracotta transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-medium text-terracotta whitespace-nowrap bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-white/50 dark:border-white/10 px-3 py-1 rounded-full text-sm shadow-sm">
                      {item.price}
                    </span>
                  </div>
                  {item.desc && (
                    <p className="text-sm text-marine/60 dark:text-white/80 leading-relaxed">
                      {item.desc}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
