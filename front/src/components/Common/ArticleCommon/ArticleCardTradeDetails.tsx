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
      <Text style={styles.createTime}>{calculateDiffTime(createdTime)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tradeDetailContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  createTime: {
    marginLeft: 10,
    fontSize: 13,
    color: "gray",
  },
});
