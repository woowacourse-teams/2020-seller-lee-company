import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../../colors";

interface ArticleCardTradeStateProps {
  tradeState: string;
}

export default function ArticleCardTradeState({
  tradeState,
}: ArticleCardTradeStateProps) {
  return (
    <View
      style={
        tradeState === "판매중"
          ? styles.containerOfOnSale
          : styles.containerOfNotOnSale
      }
    >
      <Text
        style={
          tradeState === "판매중"
            ? styles.tradeStateOfOnSale
            : styles.tradeStateOfNotOnSale
        }
      >
        {tradeState}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerOfOnSale: {
    flex: 1,
    backgroundColor: colors.primary,
    aspectRatio: 2.2,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 3,
  },
  containerOfNotOnSale: {
    flex: 1,
    backgroundColor: "lightgrey",
    aspectRatio: 3,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 3,
  },
  tradeStateOfOnSale: {
    color: "white",
    fontSize: 13,
    fontWeight: "500",
  },
  tradeStateOfNotOnSale: {
    fontSize: 13,
    color: "rgb(110,110,110)",
  },
});
