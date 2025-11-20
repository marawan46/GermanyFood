import { Info } from 'lucide-react';
import React, { useState } from 'react'

export const Card = ({ item, setShowAllergyModal }) => {
    const choices = item.choices
    const [selectedChoice, setChoice] = useState(choices[0])
    const [price, setPrice] = useState(selectedChoice.price)

  return (
    <div
      key={item.id}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all mb-0 duration-300 border border-gray-200 overflow-hidden"
    >
      <div className="flex flex-row lg:flex-col">
        <div className="relative w-24 md:w-28 flex-shrink-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 p-3 flex flex-col">
          <div className="mb-2">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="flex-1">
                <span className="inline-block px-1.5 py-0.5 bg-gray-200 text-gray-700 text-xs font-semibold rounded">
                  Nr. {item.number}
                </span>
                <h4 className="text-sm md:text-base font-bold text-gray-800 mt-1 line-clamp-1">
                  {item.title}
                </h4>
              </div>
              <button
                onClick={() => setShowAllergyModal(true)}
                className="flex items-center gap-0.5 px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors flex-shrink-0"
              >
                <Info className="w-3 h-3" />
                <span className="text-xs font-semibold">
                  {item.allergies.join(",")}
                </span>
              </button>
            </div>
            <p className="text-xs text-gray-600 line-clamp-1 md:line-clamp-2">
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
};
