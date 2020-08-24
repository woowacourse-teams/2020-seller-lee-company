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
  Home: undefined;
  SellerLee: undefined;
  ChatRoom: undefined;
  ArticleDetailScreen: { photos: string[]; memberNickname: string };
  ArticleDetailImageSlider: undefined;
  ArticleDetailImageViewScreen: undefined;
  ArticleFormScreen: undefined;
  ArticleContentsFormScreen: undefined;
  CategoryChoiceScreen: undefined;
};

export type FeedHomeNavigationProp = StackNavigationProp<
  ArticleNavigationParamList,
  "Home"
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

export type ArticleDetailImageViewRouteProp = RouteProp<
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

export type AppStackNavigationParamList = {
  TeaserScreen: undefined;
  AuthScreen: undefined;
  LoginScreen: undefined;
  JoinScreen: undefined;
  BottomTabNavigation: undefined;
};

export type TeaserScreenNavigationProp = StackNavigationProp<
  AppStackNavigationParamList,
  "LoginScreen"
>;

export type LoginScreenNavigationProp = StackNavigationProp<
  AppStackNavigationParamList,
  "LoginScreen"
>;

export type JoinScreenNavigationProp = StackNavigationProp<
  AppStackNavigationParamList,
  "JoinScreen"
>;

export type AuthScreenNavigationProp = StackNavigationProp<
  AppStackNavigationParamList,
  "AuthScreen"
>;

export interface Article {
  id: number;
  title: string;
  categoryName: string;
  price: number;
  contents: string;
  tradeState: string;
  tags: string[];
  photos: string[];
  author: Author;
  favoriteState: boolean;
  favoriteCount: number;
  hit: number;
  createdTime: string;
}

export interface ArticleCardProps {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  favoriteCount: number;
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

export type ProfileNavigationParamList = {
  ProfileScreen: undefined;
  SalesHistoryScreen: undefined;
  PurchaseHistoryScreen: undefined;
  ArticleDetailScreen: undefined;
  SelectBuyerScreen: undefined;
  EvaluationScreen: undefined;
};

export type ProfileScreenNavigationProp = StackNavigationProp<
  ProfileNavigationParamList,
  "ProfileScreen"
>;

export type SalesHistoryScreenNavigationProp = StackNavigationProp<
  ProfileNavigationParamList,
  "SalesHistoryScreen"
>;

export type PurchaseHistoryScreenNavigationProp = StackNavigationProp<
  ProfileNavigationParamList,
  "PurchaseHistoryScreen"
>;

export type SelectBuyerScreenNavigationProp = StackNavigationProp<
  ProfileNavigationParamList,
  "SelectBuyerScreen"
>;

export interface Score {
  questionId: number;
  score: number;
}
