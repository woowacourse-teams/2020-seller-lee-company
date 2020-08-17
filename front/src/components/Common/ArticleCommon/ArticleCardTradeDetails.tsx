/**
 * @author lxxjn0
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import calculateDiffTime from "../../../calculateDiffTime";

interface ArticleCardTradeDetailsProps {
  location?: string;
  tradeType: string;
  createdTime: string;
}

export default function ArticleCardTradeDetails({
  location,
  tradeType,
  createdTime,
}: ArticleCardTradeDetailsProps) {
  return (
    <View style={styles.tradeDetailContainer}>
      <View style={styles.tradeTypeContainer}>
        <Text style={styles.tradeType}>
          {location ? location + " / " : ""}
          {tradeType}
        </Text>
      </View>
      <Text>∙</Text>
      <View style={styles.timeContainer}>
        <Text style={styles.tradeType}>{calculateDiffTime(createdTime)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tradeDetailContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tradeTypeContainer: {
    justifyContent: "center",
  },
  tradeType: {
    margin: 3,
    fontSize: 10,
  },
  timeContainer: {
    justifyContent: "center",
  },
});