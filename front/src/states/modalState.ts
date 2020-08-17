import { atom } from "recoil/dist";

export const modalActivationState = atom({
  key: "modalActivationState",
  default: false,
});

export const articleDetailModalState = atom({
  key: "articleDetailModalState",
  default: false,
});
