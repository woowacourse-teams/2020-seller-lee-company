/**
 * @author begaonnuri
 */

import React from "react";
import { StyleSheet, Text } from "react-native";

export default function DetailContents() {
  return (
    <Text style={styles.contents}>
      {
        "LG 4K 모니터 삽니다.\n급하게 구해 봅니다.\n직거래 택배 거래 상관 없습니다."
      }
    </Text>
  );
}

const styles = StyleSheet.create({
  contents: {
    fontSize: 18,
    fontWeight: "300",
  },
});
