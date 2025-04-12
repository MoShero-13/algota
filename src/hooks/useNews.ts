import news from "../data/News";

export interface News {
  id: number;
  image: string;
}

const useNews = () => ({ data: news });

export default useNews;
