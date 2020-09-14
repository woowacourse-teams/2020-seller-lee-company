import { atom } from "recoil/dist";

export const chatRoomState = atom({
  key: "chatRoomState",
  default: {
    roomId: 0,
    me: {
      nickname: "",
    },
  },
});
