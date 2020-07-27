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

export interface Tag {
  id: number;
  tag: string;
}

export type TagItemProps = {
  tagBox: Tag;
};

export interface AuthorAvatar {
  uri: string;
}

export interface AuthorAvatarProps {
  avatar: AuthorAvatar;
}

export interface AuthorNameProps {
  name: string;
}

export type AuthorScore = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface AuthorScoreProps {
  score: AuthorScore;
}
