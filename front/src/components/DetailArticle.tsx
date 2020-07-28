/**
 * @author begaonnuri
 */

import React from "react";
import { StyleSheet, View } from "react-native";
import DetailTitle from "./DetailTitle";
import CategoryAndTime from "./CategoryAndTime";
import DetailContents from "./DetailContents";
import FavoriteCountAndHit from "./FavoriteCountAndHit";

export default function DetailArticle() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <DetailTitle />
      </View>
      <View style={styles.subtitleContainer}>
        <CategoryAndTime category={"디지털/가전"} time={"1분 전"} />
      </View>
      <View style={styles.contentsContainer}>
        <DetailContents />
      </View>
      <View style={styles.subtitleContainer}>
        <FavoriteCountAndHit favoriteCount={5} hit={64} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  titleContainer: {
    paddingHorizontal: 1,
    marginTop: 10,
  },
  subtitleContainer: {
    marginVertical: 15,
  },
  contentsContainer: {
    marginTop: 5,
  },
});
