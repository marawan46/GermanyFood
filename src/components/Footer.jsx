import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { TiSocialFacebook } from "react-icons/ti";
import { FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
     const [info, setInfo] = useState(null);
     const url =
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vTaMAnhmlSAyQt4Zf00IAGJBfrhDHr7-ohHKlt5MdlvueHeDsfPqFQdV1CERAVehjOhM4Ss5ENU9Mi2/pub?gid=3815514&single=true&output=csv";
     useEffect(() => {
          const fetchData = async () => {
               try {
                    const data = await fetch(url);
                    const csvText = await data.text();
                    const result = Papa.parse(csvText, {
                         header: true, // يحول الصف الأول لـ keys
                         skipEmptyLines: true,
                         dynamicTyping: true, // يحول TRUE/FALSE لـ boolean و أرقام لـ number
                    });
                    setInfo({ ...result.data[0] });
               } catch (e) {
                    console.log(e);
                    setInfo(null);
               }
          };
          fetchData();
     }, []);
    // console.log(info);

     return (
          <footer className="grid overflow-hidden gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 bg-base-200 text-base-content p-10">
               <aside>
                    <img
                         src="Logo/Logo.jpeg"
                         alt="Rangsit Logo"
                         className="w-28 aspect-square"
                    />
                    <p className="hidden md:block">
                         Rangsit Thai Street Food
                         <br />
                         Erlebe den wahren Geschmack Thailands
                    </p>
               </aside>
               <nav>
                    <h6 className="footer-title font-bold">Impressum</h6>
                    <div className="break-words ml-1">{info?.Impressum}</div>
               </nav>
               <nav>
                    <h6 className="footer-title"></h6>
                    <div className="break-words">{info?.cell2}</div>
               </nav>
               <nav>
                    <h6 className="footer-title font-bold">Social</h6>
                    <div className="social-container flex gap-5 w-96">
                         <a href={info?.Facbook} target="_blank" rel="noopener noreferrer">
                              <TiSocialFacebook size={30} />
                         </a>
                         <a href={info?.Instagram} target="_blank" rel="noopener noreferrer">
                              <FaInstagram size={30} />
                         </a>
                         <a href={info?.Tiktok} target="_blank" rel="noopener noreferrer">
                              <FaTiktok size={30} />
                         </a>
                    </div>
               </nav>
          </footer>
     );
};

export default Footer;
