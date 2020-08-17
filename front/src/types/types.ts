import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type TabParamList = {
  Home: undefined;
};

export type TabHomeNavigationProp = BottomTabNavigationProp<
  TabParamList,
  "Home"
>;

export type ArticleNavigationParamList = {
  FeedHome: undefined;
  SellerLee: undefined;
  ChatRoom: undefined;
  ArticleDetailScreen: undefined;
  ArticleDetailImageSlider: undefined;
  ArticleDetailImageViewScreen: undefined;
  ArticleFormScreen: undefined;
  ArticleContentsFormScreen: undefined;
  CategoryChoiceScreen: undefined;
};

export type FeedHomeNavigationProp = StackNavigationProp<
  ArticleNavigationParamList,
  "FeedHome"
>;

export type ChatRoomNavigationProp = StackNavigationProp<
  ArticleNavigationParamList,
  "ChatRoom"
>;

export type ArticleDetailNavigationProp = StackNavigationProp<
  ArticleNavigationParamList,
  "ArticleDetailScreen"
>;

export type ArticleDetailImageSliderNavigationProp = StackNavigationProp<
  ArticleNavigationParamList,
  "ArticleDetailImageSlider"
>;

export type ArticleDetailImageViewNavigationProp = StackNavigationProp<
  ArticleNavigationParamList,
  "ArticleDetailImageViewScreen"
>;

export type CategoryParamList = {
  CategoryHome: undefined;
  CategoryDetail: { title: string };
  Search: undefined;
};

export type CategoryHomeNavigationProp = StackNavigationProp<
  CategoryParamList,
  "CategoryHome"
>;

export type CategoryDetailNavigationProp = StackNavigationProp<
  CategoryParamList,
  "CategoryDetail"
>;

export type CategoryDetailRouteProp = RouteProp<
  CategoryParamList,
  "CategoryDetail"
>;

export type SearchNavigationProp = StackNavigationProp<
  CategoryParamList,
  "Search"
>;

export type ArticleFormParamList = {
  ArticleFormScreen: undefined;
  ArticleContentsFormScreen: undefined;
  CategoryChoiceScreen: undefined;
};

export type ArticleFormScreenNavigationProp = StackNavigationProp<
  ArticleFormParamList,
  "ArticleFormScreen"
>;

export type ArticleContentsFormScreenNavigationProp = StackNavigationProp<
  ArticleFormParamList,
  "ArticleContentsFormScreen"
>;

export type ProfileParamList = {
  PurchaseScreen: undefined;
};

export type PurchaseScreenNavigationProp = StackNavigationProp<
  ProfileParamList,
  "PurchaseScreen"
>;

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

export type AuthorScoreType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface ArticleDetailFavoriteProp {
  articleId: number;
}

export interface Feed {
  id: number;
  price: number;
  favoriteCount: number;
  tags: string[];
  favoriteState: boolean;
  photos: string[];
}

export interface Feed {
  id: number;
  price: number;
  favoriteCount: number;
  tags: string[];
  photos: string[];
}

export interface Article {
  id: number;
  title: string;
  categoryName: string;
  price: number;
  contents: string;
  tradeType: string;
  tradeState: string;
  tags: string[];
  photos: string[];
  author: Author;
  favoriteState: boolean;
  favoriteCount: number;
  hit: number;
  createdTime: string;
}

export interface ArticleCard {
  title: string;
  price: number;
  tradeType: string;
  tradeLocation: string;
  thumbnail: string;
  createdTime: string;
}

export interface Author {
  id: number;
  nickname: string;
  score: number;
  avatar: string;
  validated: boolean;
}

export interface Buyer {
  avatar: string;
  nickname: string;
}

export interface ArticleCardProps {
  title: string;
  price: number;
  tradeType: string;
  location?: string;
  createdTime: string;
  favoriteCount: number;
  chatCount: number;
  thumbnail: string;
}
