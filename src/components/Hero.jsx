import { Search } from 'lucide-react'
import React from 'react'

export const Hero = ({setSearchQuery,searchQuery}) => {
  return (
    <div className="relative h-[50vh] py-4 bg-gradient-to-r from-orange-500 to-red-500 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,0 Q50,30 100,0 L100,100 L0,100 Z" fill="#ff9f21" />
        </svg>
      </div>

      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full mb-4 md:mb-6 shadow-2xl flex items-center justify-center">
          <img
            src="https://via.placeholder.com/120x120?text=LOGO"
            alt="Restaurant Logo"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full"
          />
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 text-center font-serif">
          Authentisches Thai
        </h1>
        <p className="text-base md:text-xl text-orange-100 mb-6 md:mb-8 text-center">
          Erlebe den Geschmack Thailands
        </p>

        {/* Search Bar */}
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Suche nach Gerichten..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 md:py-4 rounded-full shadow-xl border-none focus:ring-4 focus:ring-orange-300 text-base md:text-lg"
          />
        </div>
      </div>
    </div>
  );
}
