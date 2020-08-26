import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../colors";
import { useRecoilValue } from "recoil/dist";
import { articleSelectedState } from "../../states/articleState";

export default function ArticleDetailTradeState() {
  const { tradeState } = useRecoilValue(articleSelectedState);
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
    width: 50,
    height: 25,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  containerOfNotOnSale: {
    flex: 1,
    backgroundColor: "lightgrey",
    width: 60,
    height: 25,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
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
