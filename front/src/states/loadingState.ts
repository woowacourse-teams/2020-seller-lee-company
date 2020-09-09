import { atom } from "recoil/dist";

export const loadingState = atom({
  key: "loadingState",
  default: false,
});
