import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { useRecoilState } from "recoil/dist";
import { articlePriceState } from "../../states/articleState";
import { insertComma, removeComma } from "../../replacePriceWithComma";

export default function ArticleFormPrice() {
  const [price, setPrice] = useRecoilState(articlePriceState);

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
    width: "100%",
    fontSize: 18,
  },
});
