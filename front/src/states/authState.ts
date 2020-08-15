import { atom } from "recoil/dist";

export const tokenStoredState = atom({
  key: "tokenStorageState",
  default: false,
});
