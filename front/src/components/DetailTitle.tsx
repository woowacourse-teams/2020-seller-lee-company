/**
 * @author begaonnuri
 */

import React from "react";
import { StyleSheet, Text } from "react-native";

export default function DetailTitle() {
  return <Text style={styles.title}>LG 모니터 삽니다</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 23,
    fontWeight: "bold",
  },
});
