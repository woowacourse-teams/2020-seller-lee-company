/**
 * @author kouz95
 */

import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { useRecoilState } from "recoil/dist";
import { articlePriceState } from "../states/articleState";

export default function ArticlePriceForm() {
  const [price, setPrice] = useRecoilState(articlePriceState);
  const removeCommaRegExp = /[^\d]+/g;
  const insertCommaRegExp = /\B(?=(\d{3})+(?!\d))/g;

  return (
    <TextInput
      style={styles.form}
      placeholder={"가격"}
      keyboardType={"number-pad"}
      maxLength={10}
      onChangeText={(text) => {
        const priceValue = text.replace(removeCommaRegExp, "");
        setPrice(Number(priceValue));
      }}
      value={
        price === 0 ? "" : price.toString().replace(insertCommaRegExp, ",")
      }
    />
  );
}

const styles = StyleSheet.create({
  form: {
    fontSize: 18,
  },
});
