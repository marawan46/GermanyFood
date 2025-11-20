import { Clock, MapIcon, PartyPopper, Phone, Search, Truck } from "lucide-react";
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import TextModal from "./TextModal"
export const Hero = ({ setSearchQuery, searchQuery }) => {
     const [info, setInfo] = useState([]);
     const [infoLoading, setInfoLoading] = useState(false);
     useEffect(() => {
          setInfoLoading(true);
          const fetchData = async () => {
               const data = await fetch(
                    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTaMAnhmlSAyQt4Zf00IAGJBfrhDHr7-ohHKlt5MdlvueHeDsfPqFQdV1CERAVehjOhM4Ss5ENU9Mi2/pub?gid=504534765&single=true&output=csv"
               );
               const csvText = await data.text();
               const result = Papa.parse(csvText, {
                    header: true, // يحول الصف الأول لـ keys
                    skipEmptyLines: true,
                    dynamicTyping: true, // يحول TRUE/FALSE لـ boolean و أرقام لـ number
               });
               setInfoLoading(false);
               setInfo({ ...result.data[0] });
          };
          fetchData();
     }, []);
     console.log(info);

     return (
          <div className="relative flex-col h-auto  md:h-[50vh] lg:h-auto lg:pb-5 bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden flex items-center">
               {/* Soft Wave */}
               {info.HERO_IMAGE ? (
                    <img
                         src={info.HERO_IMAGE}
                         className="absolute inset-0 object-cover opacity-60 w-full h-full"
                    ></img>
               ) : (
                    <div className="absolute inset-0 opacity-20">
                         <svg
                              className="w-full h-full"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                         >
                              <path
                                   d="M0,0 Q50,40 100,0 L100,100 L0,100 Z"
                                   fill="#FFF8F0"
                              />
                         </svg>
                    </div>
               )}

               <div className="container mx-auto px-6 text-center relative z-10">
                    {/* Logo Bubble */}
                    <div className="w-28 h-28 relative z-20 md:w-36 md:h-36 bg-light/30 backdrop-blur-xl rounded-full border border-light/50 shadow-xl flex items-center justify-center mx-auto mb-6">
                         <img
                              src={`${info.LOGO_IMAGE || "Logo/Logo.jpeg"}`}
                              alt="Restaurant Logo"
                              className="w-[calc(100%-8px)] relative z-10 rounded-full"
                         />
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl font-extrabold flex justify-center text-light drop-shadow-md leading-tight">
                         {infoLoading ? (
                              <div className="w-1/2 h-12 bg-slate-100 animate-pulse"></div>
                         ) : (
                              info.HERO_TITLE
                         )}
                    </h1>

                    {/* Subtitle */}
                    <div className="text-lg md:text-2xl flex justify-center text-light/90 mt-3 mb-8">
                         {infoLoading ? (
                              <p className="w-1/2 h-6 bg-slate-100 animate-pulse"></p>
                         ) : (
                              info.SUB_TITLE
                         )}
                    </div>

                    {/* Search Bar */}
                    <div className="relative flex items-center w-full max-w-2xl mx-auto">
                         <Search className="relative left-10 text-dark/40 w-6 h-6" />
                         <input
                              type="text"
                              placeholder="Suche nach Gerichten..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-14 pr-5 py-3.5 md:py-4 rounded-full bg-light text-dark shadow-xl outline-none focus:ring-4 focus:ring-accent/40 text-base md:text-lg"
                         />
                         <div></div>
                    </div>
               </div>
               {/* Restaurant Info Section */}
               <div className="px-6 md:px-0 mt-5">
                    <div className="bg-light/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-light/40 md:p-2 w-full max-w-3xl text-dark flex flex-wrap items-center justify-around gap-4">
                         {/* Telephone (always visible) */}
                         <div className="flex flex-col p-3 items-center gap-1">
                              <Phone />
                              <span className="text-sm font-semibold">
                                   {info.TEL || "0681-90671170"}
                              </span>
                         </div>

                         {/* Delivery Info */}
                         <label
                              htmlFor="modal-delivery"
                              className="cursor-pointer hover:bg-slate-50 p-3 transition-colors duration-150 rounded-lg flex flex-col items-center gap-1"
                         >

                                   <Truck />
                              <span className="text-sm font-semibold">
                                   Lieferservice
                              </span>
                         </label>

                         {/* Party Service */}
                         <label
                              htmlFor="modal-party"
                              className="cursor-pointer hover:bg-slate-50 p-3 transition-colors duration-150 rounded-lg flex flex-col items-center gap-1"
                         >
                              
                               <PartyPopper/>
                              <span className="text-sm font-semibold">
                                   Partyservice
                              </span>
                         </label>

                         {/* Opening Hours */}
                         <label
                              htmlFor="modal-hours"
                              className="cursor-pointer hover:bg-slate-50 p-3 transition-colors duration-150 rounded-lg flex flex-col items-center gap-1"
                         >
                              <Clock />
                              <span className="text-sm font-semibold">
                                   Öffnungszeiten
                              </span>
                         </label>

                         {/* Address */}
                         <label
                              htmlFor="modal-address"
                              className="cursor-pointer hover:bg-slate-50 p-3 transition-colors duration-150 rounded-lg flex flex-col items-center gap-1"
                         >
                            <MapIcon />
                              <span className="text-sm font-semibold">
                                   Adresse
                              </span>
                         </label>
                    </div>
                    {/* MODALS */}
                    <TextModal id="modal-delivery" title="delivery" children={info.Lieferservice} />
                    <TextModal id="modal-party" title="Partyservice" children={info.Partyservice} />
                    <TextModal id="modal-hours" title="Öffnungszeiten" children={info.Öffnungszeiten} />
                    <TextModal id="modal-address" title="Adresse" children={info.Adresse} />

               </div>

          </div>
     );
};
