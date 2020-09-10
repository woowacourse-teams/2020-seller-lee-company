import { atom } from "recoil/dist";

export const loginIdState = atom({
  key: "loginIdState",
  default: 1,
});

export const LoginTrialState = atom({
  key: "LoginTrialState",
  default: false,
});
