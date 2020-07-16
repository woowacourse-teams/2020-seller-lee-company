/**
 * @author kouz95
 */

import React from "react";
import { StyleSheet, TextInput } from "react-native";

export default function ArticlePriceForm() {
  return (
    <TextInput
      style={styles.form}
      placeholder={"가격 입력"}
      keyboardType={"number-pad"}
      maxLength={5}
    />
  );
}

const styles = StyleSheet.create({
  form: {
    fontSize: 30,
    paddingLeft: 15,
  },
});
