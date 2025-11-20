import { useState, useEffect } from "react";
import Papa from "papaparse";

export const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTaMAnhmlSAyQt4Zf00IAGJBfrhDHr7-ohHKlt5MdlvueHeDsfPqFQdV1CERAVehjOhM4Ss5ENU9Mi2/pub?gid=1954239272&single=true&output=csv";

        const res = await fetch(csvUrl);
        const text = await res.text();

        // parse CSV
        const parsed = Papa.parse(text, {
          header: true,
          skipEmptyLines: true
        });

        // extract unique categories
        const cats = Array.from(new Set(parsed.data.map(item => item.category)));
        setCategories(cats);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },[]);

  return { categories, loading, error };
};
