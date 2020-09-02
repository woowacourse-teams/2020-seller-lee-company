import React from "react";
import { StyleSheet, View } from "react-native";
import CategoryAndTime from "../Common/Info/CategoryAndTime";
import ArticleDetailContents from "./ArticleDetailContents";
import FavoriteCountAndHit from "../Common/Info/FavoriteCountAndHit";
import ArticleDetailAdditionalInfo from "./ArticleDetailAdditionalInfo";
import theme from "../../colors";

export default function ArticleDetail() {
  return (
    <View style={styles.container}>
      <ArticleDetailAdditionalInfo />
      <View style={styles.categoryAndTimeContainer}>
        <CategoryAndTime />
      </View>
      <View style={styles.contentsContainer}>
        <ArticleDetailContents />
      </View>
      <View style={styles.favoriteCount}>
        <FavoriteCountAndHit />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryAndTimeContainer: {
    marginTop: 5,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  contentsContainer: {
    marginVertical: 10,
  },
  favoriteCount: {
    paddingBottom: 10,
  },
});
