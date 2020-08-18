import axios from "axios";

// const BASE_URL = "http://3.34.248.131:8080";
const BASE_URL = "http://localhost:8080";
const domain = {
  tradeState: "/trade-state",
  articles: "/articles",
  members: "/members",
  trades: "/trades",
  login: "/login",
  chatRoom: "/chat-rooms",
  trade: "/trades",
  favorites: "/favorites",
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

interface ArticlesGetByTradeState {
  tradeState: string;
}

export const articlesAPI = {
  get: async (params: ArticlesGet) =>
    await axios.get(`${BASE_URL}${domain.articles}`, { params }),
  getByTradeState: async (params: ArticlesGetByTradeState) =>
    await axios.get(`${BASE_URL}${domain.articles}/trade-state`, { params }),
  post: async (data: ArticlesPost) =>
    await axios.post(`${BASE_URL}${domain.articles}`, data),
  put: async (articleId: number, data: ArticlesPost) =>
    await axios.put(`${BASE_URL}${domain.articles}/${articleId}`, data),
  delete: async (articleId: number) =>
    await axios.delete(`${BASE_URL}${domain.articles}/${articleId}`),
  updateTradeState: async (id: number, data: ArticlesGetByTradeState) =>
    await axios.patch(
      `${BASE_URL}${domain.articles}/${id}${domain.tradeState}`,
      data,
    ),
};

export const articleDetailAPI = {
  get: async (articleId: number) =>
    await axios.get(`${BASE_URL}${domain.articles}/${articleId}`, {
      // 해당 부분은 Member가 구현되면 수정되어야함.
      params: {
        memberId: 1,
      },
    }),
};

interface MemberLogin {
  email: string;
  password: string;
}

export const memberAPI = {
  post: async (data: MemberLogin) =>
    await axios.post(`${BASE_URL}${domain.login}`, { data }),
};

export const chatRoomAPI = {
  getBuyers: async (articleId: number) =>
    await axios.get(`${BASE_URL}${domain.chatRoom}`, {
      params: {
        articleId,
      },
    }),
};

interface FavoriteCreate {
  articleId: number;
}

interface FavoriteDelete {
  articleId: number;
}

export const favoriteAPI = {
  post: async (data: FavoriteCreate) =>
    await axios.post(BASE_URL + domain.favorites, data),
  delete: async (data: FavoriteDelete) =>
    await axios.delete(BASE_URL + domain.favorites, { data }),
};

export const tradeAPI = {
  get: async () => await axios.get(BASE_URL + domain.trades),
};
