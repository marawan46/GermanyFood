import { useRef } from "react";
import { ChevronLeft, ChevronRight, UtensilsCrossed } from "lucide-react";

export default function CategoryFilterWithScroll({
     categories,
     selectedCategory,
     setSelectedCategory,
     catLoading,
}) {
     const scrollContainerRef = useRef(null);

     const scroll = (direction) => {
          if (!scrollContainerRef.current) return;

          const scrollAmount = 300;
          scrollContainerRef.current.scrollBy({
               left: direction === "left" ? -scrollAmount : scrollAmount,
               behavior: "smooth",
          });
     };

     return (
          <div className="sticky top-0 w-screen z-40 bg-white shadow-md border-b-2 border-orange-200">
               <div className="container mx-auto px-4 py-2 md:py-3">
                    <div className="relative overflow-hidden">
                         {/* Left Arrow */}
                         <button
                              onClick={() => scroll("left")}
                              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-all"
                         >
                              <ChevronLeft className="w-5 h-5 text-gray-700" />
                         </button>

                         {/* Scrollable Categories */}
                         <div
                              ref={scrollContainerRef}
                              className="flex gap-2 overflow-x-auto pb-2 px-4 md:px-6 scrollbar-hide"
                         >
                              <button
                                   onClick={() => setSelectedCategory("Alle")}
                                   className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-full whitespace-nowrap transition-all flex-shrink-0 text-sm md:text-base ${
                                        selectedCategory === "Alle"
                                             ? "bg-orange-500 text-white shadow-lg"
                                             : "bg-gray-100 text-gray-700 hover:bg-orange-100"
                                   }`}
                              >
                                   <UtensilsCrossed className="w-4 h-4 md:w-5 md:h-5" />
                                   <span className="font-semibold">Alle</span>
                              </button>

                              {!catLoading
                                   ? categories.map((cat) => (
                                          <a
                                               key={cat}
                                               href="#Products"
                                               onClick={() =>
                                                    setSelectedCategory(cat)
                                               }
                                               className={`flex hover:cursor-pointer items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-full whitespace-nowrap transition-all flex-shrink-0 text-sm md:text-base ${
                                                    selectedCategory === cat
                                                         ? "bg-orange-500 text-white shadow-lg"
                                                         : "bg-gray-100 text-gray-700 hover:bg-orange-100"
                                               }`}
                                          >
                                               <span className="font-semibold">
                                                    {cat}
                                               </span>
                                          </a>
                                     ))
                                   : ["a", "b", "c", "d", "e", "f"].map((l) => (
                                          <div
                                               key={l}
                                               className="rounded-2xl w-20 px-3 py-2 animate-pulse bg-gray-200"
                                          ></div>
                                     ))}
                         </div>

                         {/* Right Arrow */}
                         <button
                              onClick={() => scroll("right")}
                              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-all"
                         >
                              <ChevronRight className="w-5 h-5 text-gray-700" />
                         </button>
                    </div>
               </div>

               <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
          </div>
     );
}
