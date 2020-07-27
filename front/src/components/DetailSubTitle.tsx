/**
 * @author begaonnuri
 */

import React from "react";
import { StyleSheet, Text } from "react-native";

export default function DetailSubTitle() {
  return <Text style={styles.subTitle}>디지털/가전 | 1분 전</Text>;
}

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 15,
    color: "#888888",
  },
});
