/**
 * @author begaonnuri, joseph415
 */

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ImageProps } from "react-native";

export type CategoryParamList = {
  CategoryHome: undefined;
  CategoryDetail: { title: string };
  Search: undefined;
};

export type CategoryHomeNavigationProp = StackNavigationProp<
  CategoryParamList,
  "CategoryHome"
>;

export type CategoryDetailRouteProp = RouteProp<
  CategoryParamList,
  "CategoryDetail"
>;

export type CategoryDetailNavigationProp = StackNavigationProp<
  CategoryParamList,
  "CategoryDetail"
>;

export type SearchNavigationProp = StackNavigationProp<
  CategoryParamList,
  "Search"
>;

export type CategoryItemProps = {
  title: string;
};

export type Tag = {
  id: number;
  tag: string;
};

export type TagItemProps = {
  tagBox: Tag;
};

type Photo = {
  id: number;
  location: ImageProps;
};

export interface FeedArticleCardProps {
  id: number;
  price: number;
  tagBoxes: Tag[];
  favorite: number;
  photos: Photo[];
}

export interface FeedArticle {
  feedArticle: FeedArticleCardProps;
}
