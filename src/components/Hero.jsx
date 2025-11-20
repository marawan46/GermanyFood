import { Search } from 'lucide-react'
import React from 'react'

export const Hero = ({setSearchQuery,searchQuery}) => {
  return (
<div className="relative h-[60vh] md:h-[70vh] bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden flex items-center">
  {/* Soft Wave */}
  <div className="absolute inset-0 opacity-20">
    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d="M0,0 Q50,40 100,0 L100,100 L0,100 Z" fill="#FFF8F0" />
    </svg>
  </div>

  <div className="container mx-auto px-6 text-center relative z-10">
    {/* Logo Bubble */}
    <div className="w-28 h-28 md:w-36 md:h-36 bg-light/30 backdrop-blur-xl rounded-full border border-light/50 shadow-xl flex items-center justify-center mx-auto mb-6">
      <img
        src="Logo/Logo.jpeg"
        alt="Restaurant Logo"
        className="w-[calc(100%-8px)] rounded-full"
      />
    </div>

    {/* Title */}
    <h1 className="text-4xl md:text-6xl font-extrabold text-light drop-shadow-md leading-tight">
      Authentisches Thai
    </h1>

    {/* Subtitle */}
    <p className="text-lg md:text-2xl text-light/90 mt-3 mb-8">
      Erlebe den wahren Geschmack Thailands
    </p>

    {/* Search Bar */}
    <div className="relative w-full max-w-2xl mx-auto">
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-dark/40 w-6 h-6" />
      <input
        type="text"
        placeholder="Suche nach Gerichten..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-14 pr-5 py-3.5 md:py-4 rounded-full bg-light text-dark shadow-xl outline-none focus:ring-4 focus:ring-accent/40 text-base md:text-lg"
      />
    </div>
  </div>
</div>


  );
}
