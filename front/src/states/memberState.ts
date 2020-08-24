import { atom } from "recoil/dist";

export const authorTheCheatState = atom({
  key: "authorTheCheatState",
  default: false,
});

export const memberNicknameState = atom({
  key: "memberNicknameState",
  default: "",
});

export const memberAvatarState = atom({
  key: "memberAvatarState",
  default: "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png",
});
