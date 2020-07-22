/**
 * @author joseph415
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FeedArticle } from "../../types/types";
import FeedArticleTag from "./FeedArticleTag";

export default function FeedArticleCard({ feedArticle }: FeedArticle) {
  return (
    <View style={styles.articleContainer}>
      <View style={styles.photoContainer}>
        <Text style={styles.temp}>photo</Text>
      </View>
      <View style={styles.articleSemiDetailsContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.temp}>heart and price</Text>
        </View>
        <View style={styles.tagContainer}>
          {feedArticle.tagBoxes.map((tagItem) => (
            <FeedArticleTag tagBox={tagItem} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  temp: {
    color: "white",
  },
  articleContainer: {
    backgroundColor: "black",
    paddingVertical: 15,
    aspectRatio: 4 / 3,
  },
  photoContainer: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    flex: 3,
  },
  articleSemiDetailsContainer: {
    flex: 1.3,
  },
  detailsContainer: {
    backgroundColor: "blue",
    flex: 1,
  },
  tagContainer: {
    backgroundColor: "green",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
});
