import React from "react";
import { View } from "react-native";
import { ArticleCardProps } from "../../types/types";
import ArticleCard from "../Common/ArticleCommon/ArticleCard";

interface MyFavoriteItemProps {
  article: ArticleCardProps;
}

export default function MyFavoriteItem({
  article: {
    id,
    title,
    price,
    thumbnail,
    favoriteState,
    favoriteCount,
    createdTime,
  },
}: MyFavoriteItemProps) {
  return (
    <View>
      <ArticleCard
        id={id}
        title={title}
        price={price}
        thumbnail={thumbnail}
        favoriteState={favoriteState}
        favoriteCount={favoriteCount}
        createdTime={createdTime}
      />
    </View>
  );
}
