/**
 * @author begaonnuri, joseph415
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import TagComponent from "../components/TagComponent";

export default function WriteScreen() {
  return (
    <View style={styles.container}>
      <TagComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});
