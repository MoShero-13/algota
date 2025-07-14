import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // تأكد من المسار
import { Category } from "../types";

const useCategories = () => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("id", { ascending: true });

      if (!error && data) {
        setData(data);
      }

      setLoading(false);
    };

    fetchCategories();
  }, []);

  return { data, loading };
};

export default useCategories;
