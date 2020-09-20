import React from "react";
import { StyleSheet, Text, View } from "react-native";
import theme from "../../colors";

export default function ChatTradeState({ tradeState }: { tradeState: string }) {
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
    <View style={styles.container}>
      <View style={getContainerStyleByTradeState()}>
        <Text style={getTextStyleByTradeState()}>{tradeState}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  tradeOnSaleContainer: {
    flex: 1,
    marginTop: 5,
    aspectRatio: 5 / 3,
    backgroundColor: theme.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tradeReservedContainer: {
    flex: 1,
    marginTop: 5,
    aspectRatio: 5 / 3,
    backgroundColor: theme.secondary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tradeCompletedContainer: {
    flex: 1,
    marginTop: 5,
    aspectRatio: 5 / 3,
    backgroundColor: "lightgrey",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tradeOnSaleText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  tradeReservedText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  tradeCompletedText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "grey",
  },
});
