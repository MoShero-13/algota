import productsDetails from "../data/productDetails";

export interface ProductsDetails {
  id: number;
  image: string;
}

const useProducts = () => ({ data: productsDetails });

export default useProducts;
