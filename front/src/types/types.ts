/**
 * @author kouz95
 */

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ImageURISource } from "react-native";

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

export interface Tag {
  id: number;
  tag: string;
}

export type TagItemProps = {
  tagBox: Tag;
};

export type ImageSliderParamList = {
  ArticleDetailScreen: undefined;
  ArticleDetailImageViewScreen: {
    images: ImageURISource[];
  };
};
