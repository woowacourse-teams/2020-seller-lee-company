/**
 * @author begaonnuri
 */

import React from "react";
import { StyleSheet, Text } from "react-native";

export default function ArticleDetailContents() {
  return (
    <Text style={styles.contents}>
      {
        "LG 4K 모니터 삽니다.\n급하게 구해 봅니다.\n직거래 택배 거래 상관 없습니다.\n내용이 업서요\n\n\n\n\n\n\n\n빈 줄 짝짝"
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
