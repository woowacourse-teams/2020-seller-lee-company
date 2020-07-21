/**
 * @author begaonnuri, joseph415
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
