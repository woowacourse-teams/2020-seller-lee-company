import axios from "axios";
import { DeviceStorage } from "../auth/DeviceStorage";
import { Score } from "../types/types";

// const SERVER_IP = "15.164.125.244";
const LOCAL_SERVER_IP = "localhost";
const LOCAL_SERVER_PORT = "8080";
const QA_SERVER_IP = "192.168.0.7";
const QA_SERVER_PORT = "19000";

const BASE_URL = `http://${LOCAL_SERVER_IP}:${LOCAL_SERVER_PORT}`;

export const CHAT_BASE_URL = BASE_URL;

export const KAKAO_LOGIN_API_URI = `${BASE_URL}/oauth2/authorization/kakao`;

const domain = {
  tradeState: "/trade-state",
  articles: "/articles",
  members: "/members",
  trades: "/trades",
  api: "/api",
  loginNotOAuth: "/login/not-oauth",
  chatRoom: "/chat/rooms",
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
    return await axios.get(`${BASE_URL}${domain.api}${domain.articles}`, {
      params,
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
  getByCategory: async (params: ArticlesGetByCategory) => {
    const token = await DeviceStorage.getToken();
    return await axios.get(`${BASE_URL}${domain.api}${domain.articles}`, {
      params,
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
  getByTradeState: async (params: ArticlesGetByTradeState) => {
    const token = await DeviceStorage.getToken();
    return await axios.get(`${BASE_URL}${domain.api}${domain.articles}`, {
      params,
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
  post: async (data: ArticlesPost) => {
    const token = await DeviceStorage.getToken();
    return await axios.post(
      `${BASE_URL}${domain.api}${domain.articles}`,
      data,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    );
  },
  put: async (articleId: number, data: ArticlesPost) => {
    const token = await DeviceStorage.getToken();
    await axios.put(
      `${BASE_URL}${domain.api}${domain.articles}/${articleId}`,
      data,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    );
  },
  putByTradeState: async (articleId: number, data: ArticlesGetByTradeState) => {
    const token = await DeviceStorage.getToken();
    await axios.put(
      `${BASE_URL}${domain.api}${domain.articles}/${articleId}/${domain.tradeState}`,
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
    await axios.delete(
      `${BASE_URL}${domain.api}${domain.articles}/${articleId}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    );
  },
};

export const articleDetailAPI = {
  get: async (articleId: number) => {
    const token = await DeviceStorage.getToken();
    return await axios.get(
      `${BASE_URL}${domain.api}${domain.articles}/${articleId}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    );
  },
};

interface VerifyNickname {
  nickname: string;
}

//todo 여기부터
interface MemberLogin {
  nickname: string;
  password: string;
}

interface MemberJoin {
  nickname: string;
  password: string;
  avatar: string;
}

//todo 여기까지

export const memberAPI = {
  //todo 여기부터
  login: async (data: MemberLogin) =>
    await axios.post(`${BASE_URL}${domain.loginNotOAuth}`, data),
  join: async (data: MemberJoin) =>
    await axios.post(`${BASE_URL}${domain.members}`, data),
  findNickname: async (params: VerifyNickname) => {
    const token = await DeviceStorage.getToken();
    return await axios.get(`${BASE_URL}${domain.api}${domain.members}`, {
      params,
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
};

interface ProfilePost {
  nickname: string;
  avatar: string;
}

export const profileAPI = {
  get: async () => {
    const token = await DeviceStorage.getToken();
    return await axios.get(`${BASE_URL}${domain.api}${domain.profiles}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
  put: async (data: ProfilePost) => {
    const token = await DeviceStorage.getToken();
    return await axios.put(`${BASE_URL}${domain.api}${domain.profiles}`, data, {
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
  getFavorites: async () => {
    const token = await DeviceStorage.getToken();
    return await axios.get(`${BASE_URL}${domain.api}${domain.favorites}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
  post: async (data: FavoriteCreate) => {
    const token = await DeviceStorage.getToken();
    return await axios.post(
      `${BASE_URL}${domain.api}${domain.favorites}`,
      data,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    );
  },
  delete: async (data: FavoriteDelete) => {
    const token = await DeviceStorage.getToken();
    return await axios.delete(`${BASE_URL}${domain.api}${domain.favorites}`, {
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
    return await axios.get(`${BASE_URL}${domain.api}${domain.trades}`, {
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
    return await axios.post(
      `${BASE_URL}${domain.api}${domain.evaluation}`,
      data,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    );
  },
};

interface CreateChatRoom {
  articleId: number;
  sellerId: number;
}

export const chatRoomAPI = {
  create: async (data: CreateChatRoom) => {
    const token = await DeviceStorage.getToken();
    return await axios.post(
      `${BASE_URL}${domain.api}${domain.chatRoom}`,
      data,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    );
  },
  getBuyers: async (articleId: number) => {
    const token = await DeviceStorage.getToken();
    return await axios.get(`${BASE_URL}${domain.api}${domain.chatRoom}`, {
      params: {
        articleId,
      },
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
};
