import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ArticleCard from "../Common/ArticleCommon/ArticleCard";
import theme from "../../colors";
import { ArticleCardProps } from "../../types/types";

interface PurchaseArticleProps {
  article: ArticleCardProps;
}

export default function PurchaseHistoryItem({
  article: {
    id,
    title,
    price,
    createdTime,
    tradeState,
    favoriteState,
    favoriteCount,
    thumbnail,
  },
}: PurchaseArticleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.articleCardContainer}>
        <ArticleCard
          id={id}
          title={title}
          price={price}
          createdTime={createdTime}
          tradeState={tradeState}
          favoriteState={favoriteState}
          favoriteCount={favoriteCount}
          thumbnail={thumbnail}
        />
      </View>
      <TouchableOpacity activeOpacity={0.5} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>작성한 후기 보기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  articleCardContainer: {
    margin: 5,
  },
  buttonContainer: {
    backgroundColor: theme.primary,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "white",
  },
});
