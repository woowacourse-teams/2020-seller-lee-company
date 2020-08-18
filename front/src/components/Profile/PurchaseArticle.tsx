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
  createdTime: string;
  favoriteCount: number;
  chatCount: number;
  thumbnail: string;
}

export default function PurchaseArticle({
  title,
  price,
  createdTime,
  favoriteCount,
  chatCount,
  thumbnail,
}: PurchaseArticleProps) {
  //터틀이 이미 해둔거라 임시로 넣어둠
  return (
    <View style={styles.container}>
      <View style={styles.articleCardContainer}>
        <ArticleCard
          id={1}
          title={title}
          price={price}
          createdTime={createdTime}
          favoriteCount={favoriteCount}
          chatCount={chatCount}
          thumbnail={thumbnail}
          tradeState={"판매중"}
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
