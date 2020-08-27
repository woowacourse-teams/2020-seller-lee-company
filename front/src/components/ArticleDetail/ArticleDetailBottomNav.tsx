import React from "react";
import { StyleSheet, View } from "react-native";
import ArticleDetailFavorite from "./ArticleDetailFavorite";

export default function ArticleDetailBottomNav() {
  return (
    <View style={styles.container}>
      <View style={styles.favoriteContainer}>
        <ArticleDetailFavorite />
      </View>
      <View style={styles.priceContainer}>
        <ArticleDetailFavorite />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "green",
  },
  favoriteContainer: {
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  priceContainer: {
    aspectRatio: 1,
    // backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
});
