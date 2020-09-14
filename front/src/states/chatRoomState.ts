import { atom } from "recoil/dist";

export const chatRoomState = atom({
  key: "chatRoomState",
  default: {
    roomId: 0,
    opponent: {
      id: 0,
      nickname: "",
      avatar: "",
    },
    me: {
      nickname: "",
    },
  },
});
