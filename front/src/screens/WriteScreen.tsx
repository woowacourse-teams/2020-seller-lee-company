/**
 * @author begaonnuri, joseph415
 */

import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function WriteScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Write Screen</Text>
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
  text: {
    color: "white",
    fontSize: 30,
  },
});
