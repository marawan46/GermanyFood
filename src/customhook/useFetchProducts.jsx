import { useState, useEffect } from "react";
import Papa from "papaparse";

// Custom hook to fetch products from Google Sheets CSV
export const useFetchProducts = () => {
     const [products, setProducts] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     useEffect(() => {
          const fetchProducts = async () => {
               try {
                    setLoading(true);
                    setError(null);

                    const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTaMAnhmlSAyQt4Zf00IAGJBfrhDHr7-ohHKlt5MdlvueHeDsfPqFQdV1CERAVehjOhM4Ss5ENU9Mi2/pub?gid=1954239272&single=true&output=csv"
                         
                    const response = await fetch(csvUrl);

                    if (!response.ok) {
                         throw new Error(
                              `HTTP error! status: ${response.status}`
                         );
                    }

                    const csvText = await response.text();
                    const result = await Papa.parse(csvText, {
                         header: true, // يحول الصف الأول لـ keys
                         skipEmptyLines: true,
                         dynamicTyping: true, // يحول TRUE/FALSE لـ boolean و أرقام لـ number
                    });
                    const cleanedData = result.data.map((item) => {
                         if (item.choices) {
                              try {
                                   item.choices = JSON.parse(item.choices);
                              } catch (e) {
                                   item.choices = [];
                              }
                         }
                         return item; // مهم جداً
                    });

                    setProducts(cleanedData);
               } catch (err) {
                    setError(err.message);
                    console.error("Error fetching products:", err);
               } finally {
                    setLoading(false);
               }
          };

          fetchProducts();
     }, []);

     return { products, loading, error };
};
