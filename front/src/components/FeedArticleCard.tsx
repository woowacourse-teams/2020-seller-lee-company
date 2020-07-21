/**
 * @author joseph415
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function FeedArticleCard() {
  return (
    <View style={styles.articleContainer}>
      <View style={styles.photoContainer}>
        <Text
          style={{
            color: "white",
          }}
        >
          photo
        </Text>
      </View>
      <View style={styles.articleDetailsContainer}>
        <Text
          style={{
            color: "white",
          }}
        >
          details
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  articleContainer: {
    aspectRatio: 4 / 3,
  },
  photoContainer: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    flex: 3,
  },
  articleDetailsContainer: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    flex: 1.3,
  },
});
