import { atom } from "recoil";

export const myInfoPasswordState = atom({
  key: "myInfoPasswordState",
  default: "",
});

export const myInfoCheckPasswordState = atom({
  key: "myInfoCheckPasswordState",
  default: "",
});

export const myInfoSubmitState = atom({
  key: "myInfoSubmitState",
  default: false,
});
