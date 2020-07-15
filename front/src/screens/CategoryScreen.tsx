/**
 * @author begaonnuri, joseph415
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CategoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Category Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 30,
  },
});
