/**
 * @author kouz95
 */

import { atom } from "recoil/dist";
import { ImageInfo } from "../types/types";

export const articleTitleState = atom({
  key: "articleTitleState",
  default: "",
});

export const articlePriceState = atom({
  key: "articlePriceState",
  default: 0,
});

export const articleImagesState = atom({
  key: "articleImagesState",
  default: <ImageInfo[]>[],
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
