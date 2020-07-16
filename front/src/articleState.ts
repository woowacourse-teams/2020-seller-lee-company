import { atom } from "recoil/dist";

export const titleState = atom({
  key: "titleState",
  default: "",
});

export const priceState = atom({
  key: "priceState",
  default: 0,
});

export const contentsState = atom({
  key: "contentsState",
  default: "",
});
