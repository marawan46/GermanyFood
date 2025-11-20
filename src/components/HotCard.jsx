import { Flame, Info } from 'lucide-react';
import React, { useState } from 'react'

export const HotCard = ({item ,setShowAllergyModal}) => {
    const choices = item.choices
    const [selectedChoice, setChoice] = useState(choices[0])
    const [price, setPrice] = useState(selectedChoice.price)
    return (
      <div key={item.id} className="w-full">
        <div className="flex flex-row md:flex-col bg-gradient-to-br from-orange-50 to-red-50 rounded-xl overflow-hidden transition-all hover:translate-y-[-8px] duration-300 border-2 border-orange-300">
          <div className="relative flex justify-center bg-slate-200">
            <div className="md:w-full w-32 h-full md:h-32">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
              <Flame className="w-3 h-3" />
              <span className="text-xs font-bold">HOT</span>
            </div>
          </div>

          <div className="p-3 md:p-4 flex flex-col">
            <div className="mb-2">
              <span className="inline-block px-2 py-0.5 bg-orange-200 text-orange-800 text-xs font-semibold rounded mb-1">
                Nr. {item.number}
              </span>
              <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
                {item.description}
              </p>
            </div>

            <div className="mt-auto space-y-2">
              <select
                value={selectedChoice}
                onChange={(e) => {
                  const newChoice = e.target.value;
                  setChoice(newChoice);
                  setPrice(choices[newChoice].price);
                }}
                className="w-full px-2 py-1.5 rounded-lg border-2 border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 bg-white text-xs md:text-sm"
              >
                {item.choices.map((choice, idx) => (
                  <option key={idx} value={idx}>
                    {choice.type} - {choice.price.toFixed(2)}€
                  </option>
                ))}
              </select>

              <div className="flex items-center justify-between">
                <div className="text-lg md:text-xl font-bold text-orange-600">
                  {price.toFixed(2)}€
                </div>

                <button
                  onClick={() => setShowAllergyModal(true)}
                  className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs"
                >
                  <Info className="w-3 h-3" />
                  <span className="font-semibold">
                    {item.allergies.join(", ")}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
