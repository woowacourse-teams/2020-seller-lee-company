import axios from "axios";

// const BASE_URL = "http://3.34.248.131:8080";
const BASE_URL = "http://localhost:8080";
const prefix = {
  article: "/articles",
};

interface ArticlePost {
  title: string;
  price: number;
  category: string;
  contents: string;
  tags: string[];
  images: string[];
  authorId: number;
}

interface ArticleGet {
  lastArticleId: number;
  size: number;
}

export const articleAPI = {
  get: async (params: ArticleGet) =>
    await axios.get(BASE_URL + prefix.article, { params }),
  post: async (data: ArticlePost) =>
    await axios.post(BASE_URL + prefix.article, data),
};
