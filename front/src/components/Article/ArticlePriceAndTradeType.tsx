/**
 * @author joseph415
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { insertComma } from "../../replacePriceWithComma";
import { useRecoilValue } from "recoil/dist";
import { articleSelectedState } from "../../states/articleState";

export default function ArticlePriceAndTradeType() {
  const { price, tradeType, tradeLocation } = useRecoilValue(
    articleSelectedState,
  );

  return (
    <View style={styles.priceAndActionType}>
      <Text style={styles.price}>{insertComma(price.toString())}원</Text>
      <Text style={styles.text}>
        {tradeType === "직거래"
          ? `${tradeType} | ${tradeLocation}`
          : `${tradeType}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  priceAndActionType: {
    justifyContent: "center",
    marginLeft: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    color: "#888888",
  },
});
