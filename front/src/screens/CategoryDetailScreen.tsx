import React from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 *
 * @author 터틀, 서브웨이
 */

const styles = StyleSheet.create({
  container: {
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

export default function CategoryDetailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CategoryDetail Screen</Text>
    </View>
  );
}
