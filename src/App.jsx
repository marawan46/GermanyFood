import React, { useState, useMemo } from "react";
import {
     Search,
     Flame,
     Info,
     ChefHat,
     Soup,
     Salad,
     UtensilsCrossed,
     Fish,
     IceCream,
     Coffee,
     ChevronRight,
     ChevronLeft,
     XIcon,
} from "lucide-react";

import { useRef } from "react";
import { Hero } from "./components/Hero";
import ProductCarousel from "./components/ProductsCarousel";
import { Card } from "./components/Card";
import { useFetchProducts } from "./customhook/useFetchProducts";
import { useFetchCategories } from "./customhook/useFetchCategories";
import useAnimateOnScroll from "./customhook/useAnimateOnScroll";
import CategoryFilterWithScroll from "./components/CategoryFilter";

// // Tailwind config colors (foody scheme)
// const colors = {
//   primary: '#FF6B35',
//   secondary: '#F7931E',
//   accent: '#4ECDC4',
//   dark: '#2C3E50',
//   light: '#FFF8F0'
// };

// Allergy information
const allergyInfo = {
     A: "Eier u.E.",
     B: "Milch u.E.",
     C: "Krebstiere",
     D: "Sellerie u.E.",
     E: "Sesamsamen u.E.",
     F: "Schwefeldioxid/Sulfite mehr als 10 mg je kg",
     G: "Erdnüsse u.E.",
     H: "Glutenhaltiges Getreide u.E.",
     J: "Schalenfrüchte und Erzeugnisse",
     K: "Sojabohnen u.E.",
     L: "Weichtiere u.E.",
     M: "Fisch und Erzeugnisse",
     N: "Enthält Milch u.E.",
     O: "Enthält Schwefeldioxid und Sulfite mehr als 10 mg je Liter",
     P: "Glutenhaltiges Getreide u.E.",
     Q: "Schalenfrüchte u.E.",
     R: "Enthält Sojabohnen und Erzeugnisse (*u.E. = und Erzeugnisse)",
     10: "Mit Farbstoff",
     11: "Mit Konservierungsstoff",
     12: "Mit Antioxidationsmittel",
     13: "Geschwefelt",
     14: "Mit Soja, Austern oder Fischsoße, welche Geschmacksverstärker beinhalten können",
     15: "Gewachst",
     16: "Mit Süßungsmittel",
     17: "Geschwärzt",
     21: "Mit Farbstoff",
     22: "Mit Konservierungsstoff",
     23: "Mit Antioxidationsmittel",
     24: "Geschwefelt",
     25: "Enthält Geschmacksverstärker",
     26: "Gewachst",
     27: "Mit Süßungsmittel, enthält eine Phenylalaninquelle",
     28: "Geschwärzt",
     29: "Koffeinhaltig",
     30: "Chininhaltig",
};

function ThaiRestaurantMenu() {
     const [searchQuery, setSearchQuery] = useState("");
     const [selectedCategory, setSelectedCategory] = useState("Alle");
     const [showAllergyModal, setShowAllergyModal] = useState(false);
     const carouselRef = useRef(null);
     const { categories, loading: catLoading } = useFetchCategories();

     const { products, loading: productsLoading, error } = useFetchProducts();
     //console.log(products);

     const filteredItems = useMemo(() => {
          const q = (searchQuery || "").trim().toLowerCase();
          let items = products || [];

          if (q) {
               items = items.filter((item) =>
                    (item?.title || "").toString().toLowerCase().includes(q)
               );
          }

          if (selectedCategory !== "Alle") {
               items = items.filter(
                    (item) => item?.category === selectedCategory
               );
          }

          return items;
     }, [searchQuery, selectedCategory, products]);
     useAnimateOnScroll([searchQuery,selectedCategory])
     return (
          <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
               <Hero
                    setSearchQuery={setSearchQuery}
                    searchQuery={searchQuery}
               />
               {/* Category Selection */}
               <CategoryFilterWithScroll
                    categories={categories}
                    catLoading={catLoading}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
               />

               {/* Hot Selling Section - Carousel */}
               <div className="container mx-auto px-4 py-8 md:py-12">
                    <div className="flex items-center justify-between mb-6 md:mb-8">
                         <div className="flex items-center gap-2 md:gap-3">
                              <Flame className="w-6 h-6 md:w-8 md:h-8 text-orange-500" />
                              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                                   Heiß & Beliebt
                              </h2>
                         </div>
                    </div>

                    <div className="relative">
                         <div
                              ref={carouselRef}
                              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                         >
                              <ProductCarousel
                                   products={products}
                                   productsLoading={productsLoading}
                                   setShowAllergyModal={setShowAllergyModal}
                                   id={"HOT"}
                              />
                         </div>
                    </div>
               </div>

               {/* All Products Section - Compact List View */}
               <div
                    id="Products"
                    className="container mx-auto px-4 pb-12 md:pb-16"
               >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
                         Unsere Speisekarte
                    </h2>

                    {categories.map((category) => {
                         const categoryItems = filteredItems.filter(
                              (item) => item.category === category
                         );

                         if (categoryItems.length === 0) return null;

                         return (
                              <div key={category} className="mb-8 md:mb-12">
                                   <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 pb-2 md:pb-3 border-b-2 border-orange-200">
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                                             {category}
                                        </h3>
                                   </div>

                                   <div
                                        data-animate="fade-up"
                                        className="space-y-3 md:space-y-0 grid gap-2 items-center justify-center grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-4"
                                   >
                                        {!catLoading &&
                                             categoryItems.map(
                                                  (item, index) => {
                                                       return (
                                                            <Card
                                                                 item={item}
                                                                 key={`${item.name}-${index}`}
                                                                 setShowAllergyModal={
                                                                      setShowAllergyModal
                                                                 }
                                                            />
                                                       );
                                                  }
                                             )}
                                   </div>
                              </div>
                         );
                    })}

                    {filteredItems.length === 0 && (
                         <div
                              className="text-center py-12 md:py-16"
                              data-animate="fade-up"
                         >
                              <p className="text-lg md:text-xl text-gray-500">
                                   Keine Gerichte gefunden.
                              </p>
                         </div>
                    )}
               </div>

               {/* Allergy Modal */}
               {showAllergyModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                         <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
                              <div className="bg-gradient-to-r from-orange-200 to-orange-400 p-4 md:p-6 text-black">
                                   <div className="flex items-center justify-between">
                                        <h3 className="text-xl md:text-2xl font-bold text-red-500">
                                             Allergene & Zusatzstoffe
                                        </h3>
                                        <button
                                             onClick={() =>
                                                  setShowAllergyModal(false)
                                             }
                                             className="text-red-500 hover:bg-gray-100 bg-gray-200 rounded-full p-2 transition-colors"
                                        >
                                             <XIcon />
                                        </button>
                                   </div>
                              </div>

                              <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(80vh-80px)] md:max-h-[calc(80vh-100px)]">
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                        {Object.entries(allergyInfo).map(
                                             ([key, value]) => (
                                                  <div
                                                       key={key}
                                                       className="flex items-start gap-2 md:gap-3 p-2.5 md:p-3 bg-orange-50 rounded-lg border border-orange-200"
                                                  >
                                                       <span className="inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 bg-orange-500 text-white font-bold rounded-full flex-shrink-0 text-sm md:text-base">
                                                            {key}
                                                       </span>
                                                       <p className="text-xs md:text-sm text-gray-700 pt-1">
                                                            {value}
                                                       </p>
                                                  </div>
                                             )
                                        )}
                                   </div>
                              </div>
                         </div>
                    </div>
               )}
          </div>
     );
}

export default function App() {
     return <ThaiRestaurantMenu />;
}
