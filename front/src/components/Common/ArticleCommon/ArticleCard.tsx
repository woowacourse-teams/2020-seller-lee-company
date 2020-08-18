import React from "react";
import { StyleSheet, View } from "react-native";
import { ArticleCardProps } from "../../../types/types";
import ArticleCardImage from "./ArticleCardImage";
import ArticleCardTitle from "./ArticleCardTitle";
import ArticleCardTradeDetails from "./ArticleCardTradeDetails";
import ArticleCardAdditional from "./ArticleCardAdditional";

export default function ArticleCard({
  title,
  price,
  createdTime,
  favoriteCount,
  chatCount,
  thumbnail,
  tradeState,
}: ArticleCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.articleCardImageContainer}>
        <ArticleCardImage thumbnail={thumbnail} />
      </View>
      <View style={styles.contentsContainer}>
        <ArticleCardTitle title={title} />
        <ArticleCardTradeDetails createdTime={createdTime} />
        <ArticleCardAdditional
          price={price}
          chatCount={chatCount}
          favoriteCount={favoriteCount}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    aspectRatio: 13 / 4,
    justifyContent: "center",
  },
  contentsContainer: {
    flex: 1,
    margin: 13,
  },
  articleCardImageContainer: {
    aspectRatio: 1,
    justifyContent: "center",
  },
});
