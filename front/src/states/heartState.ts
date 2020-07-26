import { atom, atomFamily, selector } from "recoil/dist";

export const isFavoriteState = atom({
  key: "isFavoriteState",
  default: false,
});

export const favoriteState = atom({
  key: "favoriteState",
  default: 0,
});
