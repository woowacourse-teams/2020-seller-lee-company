import { atom } from "recoil/dist";

export const loginIdState = atom({
  key: "loginIdState",
  default: 1,
});

export const loginNicknameState = atom({
  key: "loginNicknameState",
  default: "",
});

export const loginPasswordState = atom({
  key: "loginPasswordState",
  default: "",
});

export const memberLoginTrialState = atom({
  key: "memberLoginTrialState",
  default: false,
});

export const memberLoginVerifyState = atom({
  key: "memberLoginVerifyState",
  default: false,
});
