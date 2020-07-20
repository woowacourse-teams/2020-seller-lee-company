import { atom } from "recoil/dist";

export const selectedCategoryState = atom({
  key: "selectedCategoryState",
  default: "카테고리 선택",
});
