/**
 * @author kouz95
 */

import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { useRecoilState } from "recoil/dist";
import { articlePriceState } from "../states/articleState";

export default function ArticlePriceForm() {
  const [price, setPrice] = useRecoilState(articlePriceState);

  return (
    <TextInput
      style={styles.form}
      placeholder={"가격 입력"}
      keyboardType={"number-pad"}
      maxLength={10}
      onChangeText={(text) => setPrice(Number(text))}
      value={price === 0 ? "" : price.toString()}
    />
  );
}

const styles = StyleSheet.create({
  form: {
    fontSize: 30,
    paddingLeft: 15,
  },
});
