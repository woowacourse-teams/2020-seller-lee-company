/**
 * @author kouz95
 */

import React from "react";
import { StyleSheet, TextInput } from "react-native";

export default function ArticleTitleForm() {
  return (
    <TextInput
      style={styles.form}
      placeholder={"제목 입력"}
      keyboardType={"default"}
      maxLength={30}
    />
  );
}

const styles = StyleSheet.create({
  form: {
    fontSize: 30,
    paddingLeft: 15,
  },
});
