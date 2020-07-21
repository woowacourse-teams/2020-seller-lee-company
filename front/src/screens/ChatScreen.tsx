/**
 * @author begaonnuri, joseph415
 */

import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function ChatScreen() {
  return (
    <View style={styles.writeButtonContainer}>
      <Text style={styles.text}>Chat Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  writeButtonContainer: {
    flex: 1,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 30,
  },
});
