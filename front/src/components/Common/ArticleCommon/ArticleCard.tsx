/**
 * @author lxxjn0
 */

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
  tradeType,
  location,
  createdTime,
  favoriteCount,
  chatCount,
  thumbnail,
}: ArticleCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.articleCardImageContainer}>
        <ArticleCardImage thumbnail={thumbnail} />
      </View>
      <View style={styles.contentsContainer}>
        <ArticleCardTitle title={title} />
        <ArticleCardTradeDetails
          location={location}
          tradeType={tradeType}
          createdTime={createdTime}
        />
        <ArticleCardAdditional
          price={price}
          chatCount={chatCount}
          favoriteCount={favoriteCount}
        />
      </View>
    </View>
  );
}

export const innerContainerMargin = 10;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    aspectRatio: 13 / 4,
    justifyContent: "center",
  },
  contentsContainer: {
    flex: 1,
    margin: innerContainerMargin,
  },
  articleCardImageContainer: {
    aspectRatio: 1,
    justifyContent: "center",
  },
});
