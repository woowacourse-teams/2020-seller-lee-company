import { atom } from "recoil/dist";
import { defaultArticle } from "../data/defaultArticle";
import { ArticleCardProps, Organization } from "../types/types";

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
  default: <string[]>[],
});

export const articleContentsState = atom({
  key: "articleContentsState",
  default: "",
});

export const selectedOrganizationsInArticleFormState = atom({
  key: "selectedOrganizationsInArticleFormState",
  default: <Organization[]>[],
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

export const articleIsModifiedState = atom({
  key: "articleIsModifiedState",
  default: false,
});

export const articleIsEditingState = atom({
  key: "articleIsEditingState",
  default: false,
});

export const articleIdState = atom({
  key: "articleIdState",
  default: 0,
});

export const articleSalesHistoryState = atom({
  key: "articleSalesHistoryState",
  default: <ArticleCardProps[]>[],
});

export const tradeArticleState = atom({
  key: "tradeArticleState",
  default: <ArticleCardProps[]>[],
});

export const favoriteArticleState = atom({
  key: "favoriteArticleState",
  default: <ArticleCardProps[]>[],
});

export const articleFormExitState = atom({
  key: "articleFormExitState",
  default: false,
});
