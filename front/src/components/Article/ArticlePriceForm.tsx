/**
 * @author kouz95
 */

import React, { useEffect } from "react";
import { StyleSheet, TextInput } from "react-native";
import { useRecoilState } from "recoil/dist";
import { articlePriceState } from "../../states/articleState";
import { insertComma, removeComma } from "../../replacePriceWithComma";

interface ArticlePriceFormProp {
  editPrice: number;
}

export default function ArticlePriceForm({ editPrice }: ArticlePriceFormProp) {
  const [price, setPrice] = useRecoilState(articlePriceState);

  useEffect(() => setPrice(editPrice), [editPrice]);

  return (
    <TextInput
      style={styles.form}
      placeholder={"가격"}
      keyboardType={"number-pad"}
      maxLength={10}
      onChangeText={(priceValue) => setPrice(Number(removeComma(priceValue)))}
      value={price === 0 ? "" : insertComma(price.toString())}
    />
  );
}

const styles = StyleSheet.create({
  form: {
    fontSize: 18,
  },
});
