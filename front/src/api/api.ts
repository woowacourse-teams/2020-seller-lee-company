import axios from "axios";
import { DeviceStorage } from "../auth/DeviceStorage";

// const BASE_URL = "http://3.34.248.131:8080";
const BASE_URL = "http://localhost:8080";
const domain = {
  article: "/articles",
  members: "/members",
  login: "/login",
};

interface ArticlesPost {
  title: string;
  price: number;
  category: string;
  contents: string;
  tags: string[];
  photos: string[];
  authorId: number;
}

interface ArticlesGet {
  lastArticleId: number;
  size: number;
}

export const articlesAPI = {
  get: async (params: ArticlesGet) => {
    const token = await DeviceStorage.getToken();
    return await axios.get(BASE_URL + domain.article, {
      params,
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
  post: async (data: ArticlesPost) => {
    const token = await DeviceStorage.getToken();
    return await axios.post(BASE_URL + domain.article, data, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
};

export const articleDetailAPI = {
  get: async (articleId: number) => {
    const token = await DeviceStorage.getToken();
    return await axios.get(BASE_URL + domain.article + "/" + articleId, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
};

interface MemberLogin {
  nickname: string;
  password: string;
}

interface MemberJoin {
  nickname: string;
  password: string;
  avatar: string;
}

export const memberAPI = {
  login: async (data: MemberLogin) =>
    await axios.post(BASE_URL + domain.login, data),
  join: async (data: MemberJoin) =>
    await axios.post(BASE_URL + domain.members, data),
};
