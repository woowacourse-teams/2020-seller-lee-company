/**
 * @author lxxjn0
 */

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ArticleCard from "../Common/ArticleCommon/ArticleCard";
import theme from "../../colors";

interface PurchaseArticleProps {
  title: string;
  price: number;
  tradeType: string;
  location?: string;
  createdTime: string;
  favoriteCount: number;
  chatCount: number;
  thumbnail: string;
}

export default function PurchaseArticle({
  title,
  price,
  tradeType,
  createdTime,
  favoriteCount,
  chatCount,
  thumbnail,
}: PurchaseArticleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.articleCardContainer}>
        <ArticleCard
          title={title}
          price={price}
          tradeType={tradeType}
          createdTime={createdTime}
          favoriteCount={favoriteCount}
          chatCount={chatCount}
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
    aspectRatio: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "white",
  },
});
