/**
 * @author joseph415
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { insertComma } from "../../replacePriceWithComma";
import { useRecoilValue } from "recoil/dist";
import { articleSelectedState } from "../../states/articleState";

export default function ArticlePriceAndTradeType() {
  const { price } = useRecoilValue(articleSelectedState);

  return (
    <View style={styles.priceAndActionType}>
      <Text style={styles.price}>{insertComma(price.toString())}원</Text>
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
});
