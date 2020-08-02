import axios from "axios";

// const BASE_URL = "http://3.34.248.131:8080/";
const BASE_URL = "http://localhost:8080/";

interface ArticlePost {
  title: string;
  price: number;
  category: string;
  contents: string;
  tags: string[];
  images: string[];
  authorId: number;
}

export const articleAPI = {
  get: async () => await axios.get(BASE_URL),
  post: async (data: ArticlePost) => await axios.post(BASE_URL, data),
};
