import { atom } from "recoil";

export const myInfoAvatarState = atom({
  key: "memberInfoAvatarState",
  default: "",
});

export const myInfoNicknameState = atom({
  key: "myInfoNicknameState",
  default: "",
});

export const myInfoSubmitState = atom({
  key: "myInfoSubmitState",
  default: false,
});

export const myInfoNicknameDuplicatedState = atom({
  key: "myInfoNicknameDuplicatedState",
  default: false,
});

export const myInfoInitialState = atom({
  key: "myInfoInitialState",
  default: true,
});

export const myInfoModalState = atom({
  key: "myInfoModalState",
  default: false,
});
