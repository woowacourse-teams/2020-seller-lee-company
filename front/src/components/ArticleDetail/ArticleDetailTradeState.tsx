import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRecoilValue } from "recoil/dist";
import { articleSelectedState } from "../../states/articleState";
import theme from "../../colors";

export default function ArticleDetailTradeState() {
  const { tradeState } = useRecoilValue(articleSelectedState);

  const getContainerStyleByTradeState = () => {
    if (tradeState === "판매중") {
      return styles.tradeOnSaleContainer;
    }
    if (tradeState === "예약중") {
      return styles.tradeReservedContainer;
    }
    return styles.tradeCompletedContainer;
  };

  const getTextStyleByTradeState = () => {
    if (tradeState === "판매중") {
      return styles.tradeOnSaleText;
    }
    if (tradeState === "예약중") {
      return styles.tradeReservedText;
    }
    return styles.tradeCompletedText;
  };

  return (
    <View style={getContainerStyleByTradeState()}>
      <Text style={getTextStyleByTradeState()}>{tradeState}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tradeOnSaleContainer: {
    aspectRatio: 5 / 3,
    backgroundColor: theme.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tradeReservedContainer: {
    aspectRatio: 5 / 3,
    backgroundColor: theme.secondary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tradeCompletedContainer: {
    aspectRatio: 5 / 3,
    backgroundColor: "lightgrey",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tradeOnSaleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  tradeReservedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  tradeCompletedText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "grey",
  },
});
