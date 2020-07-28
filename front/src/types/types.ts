/**
 * @author lxxjn0
 */

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type categoryParamList = {
  CategoryHome: undefined;
  CategoryDetail: { title: string };
  Search: undefined;
};

export type CategoryHomeNavigationProp = StackNavigationProp<
  categoryParamList,
  "CategoryHome"
>;

export type CategoryDetailRouteProp = RouteProp<
  categoryParamList,
  "CategoryDetail"
>;

export type CategoryDetailNavigationProp = StackNavigationProp<
  categoryParamList,
  "CategoryDetail"
>;

export type SearchNavigationProp = StackNavigationProp<
  categoryParamList,
  "Search"
>;

export interface CategoryItemProps {
  title: string;
}

export type ArticleCreateParamList = {
  ArticleCreateScreen: undefined;
  ArticleContentsFormScreen: undefined;
  CategoryChoiceScreen: undefined;
};

export type ArticleCreateScreenNavigationProp = StackNavigationProp<
  ArticleCreateParamList,
  "ArticleCreateScreen"
>;

export type ArticleCreateModalNavigationProp = StackNavigationProp<
  ArticleCreateParamList,
  "ArticleCreateScreen"
>;

export interface Tag {
  id: number;
  tag: string;
}

export interface TagItemProps {
  tagBox: Tag;
}

export interface PhotoInfo {
  id: string;
  uri: string;
}

export type Category =
  | "디지털/가전"
  | "가구/인테리어"
  | "유아동/유아도서"
  | "생활/가공식품"
  | "스포츠/레저"
  | "여성잡화"
  | "여성의류"
  | "남성패션/잡화"
  | "게임/취미"
  | "뷰티/미용"
  | "반려동물용품"
  | "도서/티켓/음반"
  | "기타 중고물품";

export interface CategoryAndTimeProps {
  category: Category;
  time: string;
}

export interface FavoriteCountAndHitProps {
  favoriteCount: number;
  hit: number;
}

<<<<<<< HEAD
export interface Article {
  id: number;
  authorId: number;
  title: string;
  category: string;
  price: number;
  contents: string;
  tags: ArticleTag[];
}

export interface ArticleTag {
  name: string;
}

export type FeedParamList = {
  FeedHome: undefined;
  SellerLee: undefined;
};

export type FeedHomeNavigationProp = StackNavigationProp<
  FeedParamList,
  "FeedHome"
>;
=======
export interface AuthorAvatarType {
  uri: string;
}

export type AuthorScoreType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
>>>>>>> 54fd93c... feature: [게시글 상세 조회] 판매자 정보 컴포넌트 (#61)
