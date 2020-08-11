/**
 * @author kouz95
 */

import { atom } from "recoil/dist";
import { PhotoInfo } from "../types/types";
import { defaultArticle } from "../data/defaultArticle";

export const articleTitleState = atom({
  key: "articleTitleState",
  default: "",
});

export const articlePriceState = atom({
  key: "articlePriceState",
  default: 0,
});

export const articlePhotosState = atom({
  key: "articlePhotosState",
  default: <PhotoInfo[]>[],
});

export const articleContentsState = atom({
  key: "articleContentsState",
  default: "",
});

export const articleSelectedCategoryState = atom({
  key: "articleSelectedCategoryState",
  default: "",
});

export const articleModalActivationState = atom({
  key: "articleModalActivationState",
  default: false,
});

export const articleSelectedIdState = atom({
  key: "articleSelectedIdState",
  default: 0,
});

export const articleSelectedState = atom({
  key: "articleSelectedState",
  default: defaultArticle,
});
