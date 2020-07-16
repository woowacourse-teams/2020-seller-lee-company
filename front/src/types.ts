/**
 * @author begaonnuri
 */

import { RouteProp } from "@react-navigation/native";

export type CategoryParamList = {
  CategoryChoice: CategoryChoiceProps;
};

export type CategoryDetailRouteProp = RouteProp<
  CategoryParamList,
  "CategoryChoice"
>;

export type CategoryChoiceProps = {
  onSelectCategory: (category: string) => void;
};

export type CategoryItemProps = {
  title: string;
  onSelectCategory: (category: string) => void;
};
