/**
 * @author begaonnuri, joseph415
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import Tag from "../components/Tag";

export default function WriteScreen() {
  return (
    <View style={styles.container}>
      <Tag />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
});
