import { Info } from "lucide-react";
import React, { useState } from "react";

export const Card = ({ item, setShowAllergyModal, setProductForModal, setVisable }) => {
     const choices = item.choices || [];
     const [selectedChoice, setChoice] = useState(0);
     const [price, setPrice] = useState(() =>
          choices[0] ? choices[0].price : 0
     );

     

     //     {
     //     "id": "G6H7I",
     //     "number": 3,
     //     "title": "Wan Tan Taschen (5 Stk)",
     //     "category": "Salate",
     //     "description": "Teigtaschen mit Hähnchenfleisch, Süß Sauer Soße",
     //     "allergies": "12,C,E",
     //     "choices": [
     //         {
     //             "type": "Standard",
     //             "price": 4.5
     //         }
     //     ],
     //     "image": "[https://placehold.co/600x400](https://placehold.co/600x400)",
     //     "isAvailable": true,
     //     "isHot": true
     // }
     //if(!item.isAvailable || !item.choices) return
     return (
          <div
               key={item.id}
               className="bg-white rounded-lg h-full shadow-md hover:shadow-lg transition-all mb-0 duration-300 border border-gray-200 overflow-hidden"
               data-animate="fade-up"
          >
               <div className="flex h-full flex-row md:justify-between md:flex-col">
                    <div className="md:w-full w-32 flex-shrink-0 h-full md:h-40">
                         <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                         />
                    </div>

                    <div className="p-3 flex justify-between flex-col w-full min-w-0">
                         <div className="mb-2 flex flex-col">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                   <div className="flex-1">
                                        <span className="inline-block px-1.5 py-0.5 bg-gray-200 text-gray-700 text-xs font-semibold rounded">
                                             Nr. {item.number}
                                        </span>
                                        <h4 className="text-sm md:text-base font-bold text-gray-800 mt-1 line-clamp-1">
                                             {item.title}
                                        </h4>
                                   </div>
                              </div>
                              <p className="text-xs h-[2rem] overflow-hidden text-gray-600 ">
                                   {item.description}
                              </p>
                         </div>
                         <div className="space-y-2">
                              <button className="underline" onClick={()=>{setVisable(true);setProductForModal(item)}}>mehr sehen</button>
                              <select
                                   value={selectedChoice}
                                   onChange={(e) => {
                                        const idx = Number(e.target.value);
                                        setChoice(idx);
                                        setPrice(choices[idx]?.price ?? 0);
                                   }}
                                   className="w-full p-[0.2rem] rounded-lg border-2 border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 bg-white text-xs md:text-sm"
                              >
                                   {item.choices.map((choice, idx) => (
                                        <option key={idx} value={idx}>
                                             {choice.type} -{" "}
                                             {choice.price.toFixed(2)}€
                                        </option>
                                   ))}
                              </select>

                              <div className="flex items-center justify-between">
                                   <div className="text-lg md:text-xl font-bold text-orange-600">
                                        {Number(price).toFixed(2)}€
                                   </div>

                                   <button
                                        onClick={() =>
                                             setShowAllergyModal(true)
                                        }
                                        className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs"
                                   >
                                        <Info className="w-3 h-3" />
                                        <span className="font-semibold">
                                             {item.allergies}
                                        </span>
                                   </button>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};
