import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

type Subcategory = {
  id: string;
  category_id: string;
  name_ar: string;
  name_en: string;
};

export default function useSubcategories() {
  const [data, setData] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSubcategories = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("subcategories").select();
      if (error) {
        setError(error);
        setLoading(false);
        return;
      }
      setData(data as Subcategory[]);
      setLoading(false);
    };

    fetchSubcategories();
  }, []);

  return { data, loading, error };
}
