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
  tradeState: string;
  favoriteState: boolean;
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

export interface Score {
  questionId: number;
  score: number;
}

export interface Profile {
  nickname: string;
  avatar: string;
  score: number;
}

// **********************************************************************
// ************************** Navigation Params *************************
// **********************************************************************

export type RootStackParam = {
  TeaserScreen: undefined;
  AuthScreen: undefined;
  JoinScreen: undefined;
  HomeStack: undefined;
};

export type HomeStackParam = {
  /* 루트 */
  HomeTab: undefined;
  /* 피드 스크린 */
  FeedHomeScreen: undefined;
  ArticleDetailScreen: undefined;
  ArticleDetailPhotoViewScreen: undefined;
  /* 카테고리 스크린 */
  CategoryHomeSelectedScreen: undefined;
  CategoryHomeScreen: undefined;
  /* 게시글 생성, 수정 스크린 */
  ArticleFormScreen: undefined;
  ArticleContentsFormScreen: undefined;
  CategoryChoiceScreen: undefined;
  /* 채팅 스크린 */
  ChatScreen: undefined;
  /* 프로필 스크린 */
  ProfileScreen: undefined;
  SalesHistoryScreen: undefined;
  PurchaseHistoryScreen: undefined;
  SelectBuyerScreen: undefined;
  EvaluationScreen: undefined;
  MyInfoScreen: undefined;
  MyFavoriteScreen: undefined;
};

export type PostingStackParam = {
  ArticleFormScreen: undefined;
  ArticleContentsFormScreen: undefined;
  CategoryChoiceScreen: undefined;
};

export type HomeTabParam = {
  FeedHomeScreen: undefined;
  CategoryHomeSelectedScreen: undefined;
  PostingStack: undefined;
  ChatScreen: undefined;
  ProfileScreen: undefined;
};
