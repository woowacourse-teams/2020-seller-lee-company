import { atom } from "recoil/dist";
import { Profile } from "../types/types";

export const memberNicknameState = atom({
  key: "memberNicknameState",
  default: "",
});

export const memberAvatarState = atom({
  key: "memberAvatarState",
  default: "",
});

export const memberProfileState = atom({
  key: "memberProfileState",
  default: <Profile>{},
});

export const memberState = atom({
  key: "memberState",
  default: "",
});

export const memberIdState = atom({
  key: "memberIdState",
  default: 0,
});
