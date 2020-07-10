import React from "react";
import { View, StyleSheet, Text } from "react-native";

/**
 *
 * @author 터틀, 서브웨이
 */

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

export default function WriteScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Write Screen</Text>
    </View>
  );
}
