import { atom } from "recoil/dist";

export const categoryItemTitleState = atom({
  key: "categoryItemTitleState",
  default: "",
});

export const selectedCategoryState = atom({
  key: "selectedCategoryState",
  default: "카테고리 선택",
});
