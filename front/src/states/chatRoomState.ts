import { atom } from "recoil/dist";

export const chatRoomState = atom({
  key: "chatRoomState",
  default: {
    id: 0,
    articleInfo: {
      id: 0,
      title: "",
      price: 0,
      thumbnail: "",
      tradeState: "",
    },
    opponent: {
      id: 0,
      nickname: "",
      avatar: "",
    },
  },
});
