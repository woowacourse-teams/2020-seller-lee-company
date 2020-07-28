/**
 * @author begaonnuri
 */

import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function SellerLeeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SellerLee Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightyellow",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
  },
});
