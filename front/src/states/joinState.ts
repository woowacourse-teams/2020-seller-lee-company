import { atom } from "recoil/dist";

export const joinEmailState = atom({
  key: "joinEmailState",
  default: "",
});

export const joinNicknameState = atom({
  key: "joinNicknameState",
  default: "",
});

export const joinPasswordState = atom({
  key: "joinPasswordState",
  default: "",
});

export const joinCheckPasswordState = atom({
  key: "joinCheckPasswordState",
  default: "",
});

export const joinAvatarState = atom({
  key: "joinAvatarState",
  default: "",
});

export const joinSubmitState = atom({
  key: "joinSubmitState",
  default: false,
});

export const memberJoinVerifyState = atom({
  key: "memberJoinVerifyState",
  default: true,
});
