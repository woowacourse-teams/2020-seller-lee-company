/**
 * @author kouz95
 */

import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

export default function ArticleContentsFormScreen() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.form}
        placeholder={"내용 입력"}
        keyboardType={"default"}
        maxLength={200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    fontSize: 15,
    paddingLeft: 15,
    paddingTop: 15,
  },
});
