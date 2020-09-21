import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../../colors";
import theme from "../../../colors";

interface ArticleCardTradeStateProps {
  tradeState: string;
}

export default function ArticleCardTradeState({
  tradeState,
}: ArticleCardTradeStateProps) {
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
    paddingHorizontal: 5,
    backgroundColor: theme.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tradeReservedContainer: {
    paddingHorizontal: 5,
    backgroundColor: theme.secondary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tradeCompletedContainer: {
    paddingHorizontal: 5,
    backgroundColor: "lightgrey",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tradeOnSaleText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  tradeReservedText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  tradeCompletedText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "grey",
  },
  containerOfOnSale: {
    flex: 1,
    backgroundColor: colors.primary,
    width: 45,
    height: 25,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 3,
  },
  containerOfNotOnSale: {
    flex: 1,
    backgroundColor: "lightgrey",
    width: 60,
    height: 25,
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
