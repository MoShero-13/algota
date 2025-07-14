import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export interface Product {
  id: number;
  name_ar: string;
  name_en: string;
  image: string;
  pieceWeight: string;
  numOf: string;
  parcelBarcode: string;
  packing_type: string;
  category_id: string;
  subcategory_id: string;
}

const useProducts = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        console.error("Error fetching products:", error.message);
      } else {
        setData(data || []);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  return { data, loading };
};

export default useProducts;
