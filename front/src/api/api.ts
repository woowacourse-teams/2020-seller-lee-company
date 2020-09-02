import axios from "axios";
import { DeviceStorage } from "../auth/DeviceStorage";
import { Score } from "../types/types";

const BASE_URL = "http://15.164.125.244:8080";

const domain = {
  tradeState: "/trade-state",
  articles: "/articles",
  members: "/members",
  trades: "/trades",
  login: "/login",
  chatRoom: "/chat-rooms",
  evaluation: "/evaluations",
  favorites: "/favorites",
  profiles: "/me",
};

interface ArticlesPost {
  title: string;
  price: number;
  category: string;
  contents: string;
  tags: string[];
  photos: string[];
}

interface ArticlesGet {
  lastArticleId: number;
  size: number;
}

interface ArticlesGetByTradeState {
  tradeState: string;
}

interface ArticlesGetByCategory {
  lastArticleId: number;
  size: number;
  category: string;
}

export const articlesAPI = {
  get: async (params: ArticlesGet) => {
    const token = await DeviceStorage.getToken();
    return await axios.get(`${BASE_URL}${domain.articles}`, {
      params,
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
  getByCategory: async (params: ArticlesGetByCategory) => {
    const token = await DeviceStorage.getToken();
    return await axios.get(`${BASE_URL}${domain.articles}`, {
      params,
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
  getByTradeState: async (params: ArticlesGetByTradeState) => {
    const token = await DeviceStorage.getToken();
    return await axios.get(`${BASE_URL}${domain.articles}/trade-state`, {
      params,
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
  getFavorites: async () => {
    const token = await DeviceStorage.getToken();
    return await axios.get(`${BASE_URL}${domain.favorites}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
  post: async (data: ArticlesPost) => {
    const token = await DeviceStorage.getToken();
    return await axios.post(`${BASE_URL}${domain.articles}`, data, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
  put: async (articleId: number, data: ArticlesPost) => {
    const token = await DeviceStorage.getToken();
    await axios.put(`${BASE_URL}${domain.articles}/${articleId}`, data, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
  putByTradeState: async (articleId: number, data: ArticlesGetByTradeState) => {
    const token = await DeviceStorage.getToken();
    await axios.put(
      `${BASE_URL}${domain.articles}/${articleId}/${domain.tradeState}`,
      data,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    );
  },
  delete: async (articleId: number) => {
    const token = await DeviceStorage.getToken();
    await axios.delete(`${BASE_URL}${domain.articles}/${articleId}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
};

export const articleDetailAPI = {
  get: async (articleId: number) => {
    const token = await DeviceStorage.getToken();
    return await axios.get(`${BASE_URL}${domain.articles}/${articleId}`, {
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
    await axios.post(`${BASE_URL}${domain.login}`, data),
  join: async (data: MemberJoin) =>
    await axios.post(`${BASE_URL}${domain.members}`, data),
  getNickname: async () => {
    const token = await DeviceStorage.getToken();
    return await axios.get(`${BASE_URL}${domain.members}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
};

interface ProfilePost {
  password: string;
  avatar: string;
}

export const profileAPI = {
  get: async () => {
    const token = await DeviceStorage.getToken();
    return await axios.get(`${BASE_URL}${domain.profiles}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
  put: async (data: ProfilePost) => {
    const token = await DeviceStorage.getToken();
    return await axios.put(`${BASE_URL}${domain.profiles}`, data, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
};

interface FavoriteCreate {
  articleId: number;
}

interface FavoriteDelete {
  articleId: number;
}

export const favoriteAPI = {
  post: async (data: FavoriteCreate) => {
    const token = await DeviceStorage.getToken();
    return await axios.post(`${BASE_URL}${domain.favorites}`, data, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
  delete: async (data: FavoriteDelete) => {
    const token = await DeviceStorage.getToken();
    return await axios.delete(`${BASE_URL}${domain.favorites}`, {
      data,
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
};

export const tradeAPI = {
  get: async () => {
    const token = await DeviceStorage.getToken();
    return await axios.get(`${BASE_URL}${domain.trades}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
};

interface EvaluationPost {
  scores: Score[];
}

export const evaluationAPI = {
  post: async (data: EvaluationPost) => {
    const token = await DeviceStorage.getToken();
    return await axios.post(`${BASE_URL}${domain.evaluation}`, data, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
};

export const chatRoomAPI = {
  getBuyers: async (articleId: number) => {
    const token = await DeviceStorage.getToken();
    return await axios.get(`${BASE_URL}${domain.chatRoom}`, {
      params: {
        articleId,
      },
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
};
