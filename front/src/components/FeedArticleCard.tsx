/**
 * @author joseph415
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function FeedArticleCard() {
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
          <View style={styles.tagItem}>
            <View style={styles.tagItemTextWrapper}>
              <Text>#맥북</Text>
            </View>
          </View>
          <View style={styles.tagItem}>
            <View style={styles.tagItemTextWrapper}>
              <Text>#에어</Text>
            </View>
          </View>
          <View style={styles.tagItem}>
            <View style={styles.tagItemTextWrapper}>
              <Text>#논터치</Text>
            </View>
          </View>
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
  tagItem: {
    flexDirection: "row",
    alignItems: "center",
    height: "80%",
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: "#eeecda",
  },
  tagItemTextWrapper: {
    paddingHorizontal: 3,
  },
});
