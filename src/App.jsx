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

import { useRef } from 'react';
import { Hero } from "./components/Hero";
import ProductCarousel from "./components/ProductsCarousel";
import { Card } from "./components/Card";

// Tailwind config colors (foody scheme)
const colors = {
  primary: '#FF6B35',
  secondary: '#F7931E',
  accent: '#4ECDC4',
  dark: '#2C3E50',
  light: '#FFF8F0'
};

// Sample menu data
export const menuData = [
  {
    id: 1,
    number: 1,
    title: "Tom Yum Goong",
    category: "Suppen",
    description: "Scharfe und saure Suppe mit Garnelen, Zitronengras und Pilzen.",
    allergies: ["C", "M", "14"],
    choices: [
      { type: "Klein", price: 6.99 },
      { type: "Groß", price: 9.99 }
    ],
    priceRange: "6,99€ – 9,99€",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400"
  },
  {
    id: 2,
    number: 2,
    title: "Som Tam",
    category: "Salate",
    description: "Grüner Papayasalat mit Erdnüssen, Tomaten und Limettendressing.",
    allergies: ["G", "M", "14"],
    choices: [
      { type: "Mild", price: 8.99 },
      { type: "Scharf", price: 8.99 }
    ],
    priceRange: "8,99€",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400"
  },
  {
    id: 3,
    number: 3,
    title: "Frühlingsrollen",
    category: "Vorspeisen",
    description: "Knusprige Frühlingsrollen gefüllt mit Gemüse und Glasnudeln.",
    allergies: ["A", "H", "K", "14"],
    choices: [
      { type: "4 Stück", price: 5.99 },
      { type: "8 Stück", price: 9.99 }
    ],
    priceRange: "5,99€ – 9,99€",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400"
  },
  {
    id: 4,
    number: 4,
    title: "Pad Thai",
    category: "Nudeln & Reis",
    description: "Gebratene Reisnudeln mit Ei, Erdnüssen, Sojasprossen und Tamarinde.",
    allergies: ["A", "G", "H", "K", "M", "14"],
    choices: [
      { type: "Vegetarisch", price: 10.99 },
      { type: "mit Hähnchen", price: 11.99 },
      { type: "mit Garnelen", price: 13.99 }
    ],
    priceRange: "10,99€ – 13,99€",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400"
  },
  {
    id: 5,
    number: 5,
    title: "Green Curry",
    category: "Curry",
    description: "Grünes Curry mit Kokosmilch, Bambussprossen und Thai-Basilikum.",
    allergies: ["B", "M", "14"],
    choices: [
      { type: "Vegetarisch", price: 11.99 },
      { type: "mit Hähnchen", price: 12.99 },
      { type: "mit Rind", price: 13.99 },
      { type: "mit Garnelen", price: 14.99 }
    ],
    priceRange: "11,99€ – 14,99€",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400"
  },
  {
    id: 6,
    number: 6,
    title: "Massaman Curry",
    category: "Curry",
    description: "Mildes Curry mit Erdnüssen, Kartoffeln und Kokosmilch.",
    allergies: ["B", "G", "M", "14"],
    choices: [
      { type: "mit Hähnchen", price: 12.99 },
      { type: "mit Rind", price: 13.99 }
    ],
    priceRange: "12,99€ – 13,99€",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400"
  },
  {
    id: 7,
    number: 7,
    title: "Gebratener Reis",
    category: "Nudeln & Reis",
    description: "Thai gebratener Reis mit Ei, Gemüse und Sojasauce.",
    allergies: ["A", "K", "14"],
    choices: [
      { type: "Vegetarisch", price: 9.99 },
      { type: "mit Hähnchen", price: 10.99 },
      { type: "mit Garnelen", price: 12.99 }
    ],
    priceRange: "9,99€ – 12,99€",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400"
  },
  {
    id: 8,
    number: 8,
    title: "Satay Spieße",
    category: "Vorspeisen",
    description: "Gegrillte Hähnchen-Spieße mit Erdnuss-Sauce.",
    allergies: ["G", "K", "14"],
    choices: [
      { type: "4 Stück", price: 7.99 },
      { type: "8 Stück", price: 13.99 }
    ],
    priceRange: "7,99€ – 13,99€",
    image: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=400"
  },
  {
    id: 9,
    number: 9,
    title: "Mango Sticky Rice",
    category: "Desserts",
    description: "Klebreis mit frischer Mango und Kokosmilch.",
    allergies: ["B"],
    choices: [
      { type: "Standard", price: 6.99 }
    ],
    priceRange: "6,99€",
    image: "https://images.unsplash.com/photo-1598781430724-a3193a4e7b90?w=400"
  },
  {
    id: 10,
    number: 10,
    title: "Thai Eistee",
    category: "Getränke",
    description: "Traditioneller thailändischer Eistee mit Kondensmilch.",
    allergies: ["B", "29"],
    choices: [
      { type: "0,3L", price: 3.99 },
      { type: "0,5L", price: 5.99 }
    ],
    priceRange: "3,99€ – 5,99€",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400"
  },
  {
    id: 11,
    number: 11,
    title: "Tom Kha Gai",
    category: "Suppen",
    description: "Cremige Kokossuppe mit Hähnchen und Galgant.",
    allergies: ["B", "M", "14"],
    choices: [
      { type: "Klein", price: 7.99 },
      { type: "Groß", price: 10.99 }
    ],
    priceRange: "7,99€ – 10,99€",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400"
  },
  {
    id: 12,
    number: 12,
    title: "Larb Gai",
    category: "Salate",
    description: "Gehackter Hähnchenssalat mit Minze, Koriander und Limette.",
    allergies: ["M", "14"],
    choices: [
      { type: "Standard", price: 9.99 }
    ],
    priceRange: "9,99€",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400"
  }
];

// Allergy information
const allergyInfo = {
  "A": "Eier u.E.",
  "B": "Milch u.E.",
  "C": "Krebstiere",
  "D": "Sellerie u.E.",
  "E": "Sesamsamen u.E.",
  "F": "Schwefeldioxid/Sulfite mehr als 10 mg je kg",
  "G": "Erdnüsse u.E.",
  "H": "Glutenhaltiges Getreide u.E.",
  "J": "Schalenfrüchte und Erzeugnisse",
  "K": "Sojabohnen u.E.",
  "L": "Weichtiere u.E.",
  "M": "Fisch und Erzeugnisse",
  "N": "Enthält Milch u.E.",
  "O": "Enthält Schwefeldioxid und Sulfite mehr als 10 mg je Liter",
  "P": "Glutenhaltiges Getreide u.E.",
  "Q": "Schalenfrüchte u.E.",
  "R": "Enthält Sojabohnen und Erzeugnisse (*u.E. = und Erzeugnisse)",
  "10": "Mit Farbstoff",
  "11": "Mit Konservierungsstoff",
  "12": "Mit Antioxidationsmittel",
  "13": "Geschwefelt",
  "14": "Mit Soja, Austern oder Fischsoße, welche Geschmacksverstärker beinhalten können",
  "15": "Gewachst",
  "16": "Mit Süßungsmittel",
  "17": "Geschwärzt",
  "21": "Mit Farbstoff",
  "22": "Mit Konservierungsstoff",
  "23": "Mit Antioxidationsmittel",
  "24": "Geschwefelt",
  "25": "Enthält Geschmacksverstärker",
  "26": "Gewachst",
  "27": "Mit Süßungsmittel, enthält eine Phenylalaninquelle",
  "28": "Geschwärzt",
  "29": "Koffeinhaltig",
  "30": "Chininhaltig"
};

const categories = [
  { name: "Vorspeisen", icon: ChefHat },
  { name: "Suppen", icon: Soup },
  { name: "Salate", icon: Salad },
  { name: "Curry", icon: UtensilsCrossed },
  { name: "Nudeln & Reis", icon: UtensilsCrossed },
  { name: "Desserts", icon: IceCream },
  { name: "Getränke", icon: Coffee }
];

function ThaiRestaurantMenu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [showAllergyModal, setShowAllergyModal] = useState(false);
  const [selectedChoices, setSelectedChoices] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  const filteredItems = useMemo(() => {
    let items = menuData;
    
    if (searchQuery) {
      items = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'Alle') {
      items = items.filter(item => item.category === selectedCategory);
    }
    
    return items;
  }, [searchQuery, selectedCategory]);



  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
    <Hero setSearchQuery={setSearchQuery} searchQuery={searchQuery}/>
      {/* Category Selection */}
      <div className="sticky top-0 z-40 bg-white shadow-md border-b-2 border-orange-200">
        <div className="container mx-auto px-4 py-2 md:py-3">
          <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide pb-2">
            <button
              onClick={() => setSelectedCategory('Alle')}
              className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-full whitespace-nowrap transition-all flex-shrink-0 text-sm md:text-base ${
                selectedCategory === 'Alle'
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-semibold">Alle</span>
            </button>
            {categories.map((cat) => (
              <a
                key={cat.name}
                href="#Products"
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex hover:cursor-pointer items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-full whitespace-nowrap transition-all flex-shrink-0 text-sm md:text-base ${
                  selectedCategory === cat.name
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                }`}
              >
                <cat.icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-semibold">{cat.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Hot Selling Section - Carousel */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="flex items-center gap-2 md:gap-3">
            <Flame className="w-6 h-6 md:w-8 md:h-8 text-orange-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Heiß & Beliebt</h2>
          </div>
        </div>
        
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          >
            {/* {menuData.map((item) => {
              return (
                <HotCard item={item} setShowAllergyModal={setShowAllergyModal} handleChoiceChange={handleChoiceChange}/>
              );
            })} */}
            <ProductCarousel products={menuData} id={"HOT"}/>
          </div>
        </div>
      </div>

      {/* All Products Section - Compact List View */}
      <div id="Products" className="container mx-auto px-4 pb-12 md:pb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Unsere Speisekarte</h2>
        
        {categories.map((category) => {
          const categoryItems = filteredItems.filter(item => item.category === category.name);
          
          if (categoryItems.length === 0) return null;
          
          return (
            <div key={category.name} className="mb-8 md:mb-12">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 pb-2 md:pb-3 border-b-2 border-orange-200">
                <category.icon className="w-5 h-5 md:w-7 md:h-7 text-orange-500" />
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">{category.name}</h3>
              </div>
              
              <div className="space-y-3 md:space-y-0 grid items-center justify-center grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
                {categoryItems.map((item) => {                  
                  return (
                    <Card item={item} setShowAllergyModal={setShowAllergyModal}/>
                  );
                })}
              </div>
            </div>
          );
        })}
        
        {filteredItems.length === 0 && (
          <div className="text-center py-12 md:py-16" data-animate="fade-up">
            <p className="text-lg md:text-xl text-gray-500">Keine Gerichte gefunden.</p>
          </div>
        )}
      </div>

      {/* Allergy Modal */}
      {showAllergyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 md:p-6 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-xl md:text-2xl font-bold text-red-500">Allergene & Zusatzstoffe</h3>
                <button
                  onClick={() => setShowAllergyModal(false)}
                  className="text-red-500 hover:bg-gray-100 bg-gray-200 rounded-full p-2 transition-colors"
                >
                  <XIcon />
                </button>
              </div>
            </div>
            
            <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(80vh-80px)] md:max-h-[calc(80vh-100px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {Object.entries(allergyInfo).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-2 md:gap-3 p-2.5 md:p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <span className="inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 bg-orange-500 text-white font-bold rounded-full flex-shrink-0 text-sm md:text-base">
                      {key}
                    </span>
                    <p className="text-xs md:text-sm text-gray-700 pt-1">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}



export default function App(){
return(
<ThaiRestaurantMenu />
)
}