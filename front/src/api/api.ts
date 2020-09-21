import axios from "axios";
import { DeviceStorage } from "../auth/DeviceStorage";
import { Score } from "../types/types";

// const DEPLOY_SERVER_IP = "15.164.125.244";
// const QA_SERVER_IP = "192.168.25.4";
const LOCAL_SERVER_IP = "localhost";

const BASE_URL = `http://${LOCAL_SERVER_IP}:8080`;
export const CHAT_BASE_URL = `http://${LOCAL_SERVER_IP}:8000`;

export const KAKAO_LOGIN_API_URI = `${BASE_URL}/oauth2/authorization/kakao`;

const domain = {
  tradeState: "/trade-state",
  articles: "/articles",
  members: "/members",
  trades: "/trades",
  api: "/api",
  loginNotOAuth: "/login/not-oauth",
  chatRooms: "/chat/rooms",
  wholeChatRooms: "/chat/organizations/",
  messages: "/messages",
  evaluation: "/evaluations",
  favorites: "/favorites",
  profiles: "/me",
  organizations: "/organizations",
  memberOrganization: "/member-organizations",
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

interface ArticlesGetByOrganization {
  organizationId: number;
  parameters: ArticlesGet;
}

interface ArticlesGetByTradeState {
  tradeState: string;
}

interface ArticlesGetByCategory {
  lastArticleId: number;
  size: number;
  category: string;
}

interface ArticlesGetByCategoryAndOrganization {
  organizationId: number;
  parameters: ArticlesGetByCategory;
}

export const articlesAPI = {
  get: async (params: ArticlesGet) => {
    const token = await DeviceStorage.getToken();
    return await axios.get(
      `${BASE_URL}${domain.api}${domain.articles}${domain.organizations}`,
      {
        params,
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    );
  },

  getByOrganization: async (data: ArticlesGetByOrganization) => {
    const token = await DeviceStorage.getToken();
    const params: ArticlesGet = data.parameters;
    return await axios.get(
      `${BASE_URL}${domain.api}${domain.articles}${domain.organizations}/${data.organizationId}`,
      {
        params,
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    );
  },

  getByCategory: async (params: ArticlesGetByCategory) => {
    const token = await DeviceStorage.getToken();
    return await axios.get(
      `${BASE_URL}${domain.api}${domain.articles}${domain.organizations}`,
      {
        params,
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    );
  },

  getByCategoryAndOrganization: async (
    data: ArticlesGetByCategoryAndOrganization,
  ) => {
    const token = await DeviceStorage.getToken();
    const params: ArticlesGetByCategory = data.parameters;
    return await axios.get(
      `${BASE_URL}${domain.api}${domain.articles}${domain.organizations}/${data.organizationId}`,
      {
        params,
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    );
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

interface MemberPutByPushToken {
  pushToken: string | undefined;
}

export const memberAPI = {
  findNickname: async (params: VerifyNickname) => {
    const token = await DeviceStorage.getToken();
    return await axios.get(`${BASE_URL}${domain.api}${domain.members}`, {
      params,
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
  putByPushToken: async (data: MemberPutByPushToken) => {
    const authToken = await DeviceStorage.getToken();
    return await axios.put(`${BASE_URL}${domain.api}${domain.members}`, data, {
      headers: {
        Authorization: `bearer ${authToken}`,
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
  getPush: async () => {
    const token = await DeviceStorage.getToken();
    return await axios.get(`${BASE_URL}${domain.api}${domain.favorites}/push`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
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
      `${BASE_URL}${domain.api}${domain.chatRooms}`,
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
    return await axios.get(`${BASE_URL}${domain.api}${domain.chatRooms}`, {
      params: {
        articleId,
      },
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
  showAllByLoginMember: async () => {
    const token = await DeviceStorage.getToken();
    return await axios.get(`${BASE_URL}${domain.api}${domain.chatRooms}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
  delete: async (id: number) => {
    const token = await DeviceStorage.getToken();
    return await axios.delete(
      `${BASE_URL}${domain.api}${domain.chatRooms}/${id}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    );
  },
};

export const messageAPI = {
  showAll: async (roomId: number, size: number, lastMessageDate: string) => {
    const { data } = await axios.get(
      `${CHAT_BASE_URL}${domain.chatRooms}/${roomId}${domain.messages}`,
      {
        params: {
          size,
          lastMessageDate: lastMessageDate.slice(0, 19),
        },
      },
    );
    return data.map(
      (prevMessage: {
        id: number;
        content: string;
        senderId: number;
        senderNickname: string;
        createdTime: string;
      }) => {
        return {
          _id: prevMessage.id,
          text: prevMessage.content,
          user: {
            _id: prevMessage.senderId,
            name: prevMessage.senderNickname,
          },
          createdAt: Date.parse(prevMessage.createdTime),
        };
      },
    );
  },
  showAllInOrganization: async (
    organizationId: number,
    size: number,
    lastMessageDate: string,
  ) => {
    const { data } = await axios.get(
      `${CHAT_BASE_URL}${domain.wholeChatRooms}/${organizationId}${domain.messages}`,
      {
        params: {
          size,
          lastMessageDate: lastMessageDate.slice(0, 19),
        },
      },
    );
    return data.map(
      (prevMessage: {
        id: number;
        content: string;
        senderId: number;
        senderNickname: string;
        senderAvatar: string;
        createdTime: string;
      }) => {
        return {
          _id: prevMessage.id,
          text: prevMessage.content,
          user: {
            _id: prevMessage.senderId,
            name: prevMessage.senderNickname,
            avatar: prevMessage.senderAvatar,
          },
          createdAt: Date.parse(prevMessage.createdTime),
        };
      },
    );
  },
  showNew: async (roomId: number) => {
    return await axios.get(
      `${CHAT_BASE_URL}${domain.chatRooms}/${roomId}${domain.messages}/new`,
    );
  },
};

interface CreateOrganization {
  name: string;
}

export const organizationAPI = {
  create: async (data: CreateOrganization) => {
    const token = await DeviceStorage.getToken();
    return await axios.post(
      `${BASE_URL}${domain.api}${domain.organizations}`,
      data,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    );
  },
  showAll: async () => {
    const token = await DeviceStorage.getToken();
    return await axios.get(`${BASE_URL}${domain.api}${domain.organizations}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  },
};

interface RegisterMemberOrganization {
  code: string;
}

export const memberOrganizationAPI = {
  register: async (data: RegisterMemberOrganization) => {
    const token = await DeviceStorage.getToken();
    return await axios.post(
      `${BASE_URL}${domain.api}${domain.memberOrganization}`,
      data,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    );
  },
  delete: async (organizationId: number) => {
    const token = await DeviceStorage.getToken();
    return await axios.delete(
      `${BASE_URL}${domain.api}${domain.memberOrganization}`,
      {
        params: {
          id: organizationId,
        },
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    );
  },
};
