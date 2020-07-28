/**
 * @author begaonnuri joseph415 lxxjn0
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
