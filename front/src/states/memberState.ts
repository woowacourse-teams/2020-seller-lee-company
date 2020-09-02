import { atom } from "recoil/dist";
import { Profile } from "../types/types";

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

export const memberProfileState = atom({
  key: "memberProfileState",
  default: <Profile>{},
});

export const memberInfoAvatarState = atom({
  key: "memberInfoAvatarState",
  default: "",
});
