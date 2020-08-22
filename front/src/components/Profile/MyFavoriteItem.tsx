import React from "react";
import { View } from "react-native";
import { ArticleCardProps } from "../../types/types";

interface MyFavoriteItemProps {
  article: ArticleCardProps;
}

export default function MyFavoriteItem({ article }: MyFavoriteItemProps) {
  return <View></View>;
}
