/**
 * @author joseph415
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import FeedArticleCard from "../components/FeedArticleCard";

export default function HomeScreen() {
  return (
    <View style={styles.writeButtonContainer}>
      <FeedArticleCard />
    </View>
  );
}

const styles = StyleSheet.create({
  writeButtonContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  text: {
    color: "black",
    fontSize: 30,
  },
});
