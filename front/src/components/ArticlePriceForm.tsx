/**
 * @author kouz95
 */

import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { useRecoilState } from "recoil/dist";
import { priceState } from "../articleState";

export default function ArticlePriceForm() {
  const [price, setPrice] = useRecoilState(priceState);

  return (
    <TextInput
      style={styles.form}
      placeholder={"가격 입력"}
      keyboardType={"number-pad"}
      maxLength={10}
      onChangeText={(text) => setPrice(Number(text))}
      value={price === 0 ? undefined : price.toString()}
    />
  );
}

const styles = StyleSheet.create({
  form: {
    fontSize: 30,
    paddingLeft: 15,
  },
});
