import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ArticleDetailFavorite from "./ArticleDetailFavorite";
import { useRecoilValue } from "recoil";
import { articleSelectedState } from "../../states/articleState";
import { insertComma } from "../../replacePriceWithComma";
import theme from "../../colors";

export default function ArticleDetailBottomNav() {
  const { price } = useRecoilValue(articleSelectedState);

  return (
    <View style={styles.container}>
      <View style={styles.favoriteContainer}>
        <ArticleDetailFavorite />
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{`${insertComma(price.toString())}원`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 7,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  favoriteContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: theme.border,
    paddingRight: 30,
  },
  priceContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: theme.others,
  },
});
