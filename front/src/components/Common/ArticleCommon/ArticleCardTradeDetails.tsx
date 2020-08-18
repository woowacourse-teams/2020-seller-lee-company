/**
 * @author joseph415
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import calculateDiffTime from "../../../calculateDiffTime";

interface ArticleCardTradeDetailsProps {
  createdTime: string;
}

export default function ArticleCardTradeDetails({
  createdTime,
}: ArticleCardTradeDetailsProps) {
  return (
    <View style={styles.tradeDetailContainer}>
      <View style={styles.timeContainer}>
        <Text style={styles.createTime}>{calculateDiffTime(createdTime)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tradeDetailContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  createTime: {
    margin: 3,
    fontSize: 10,
  },
  timeContainer: {
    justifyContent: "center",
  },
});
