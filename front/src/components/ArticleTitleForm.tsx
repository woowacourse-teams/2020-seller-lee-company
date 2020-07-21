/**
 * @author kouz95
 */

import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { useRecoilState } from "recoil/dist";
import { articleTitleState } from "../states/articleState";

export default function ArticleTitleForm() {
  const [title, setTitle] = useRecoilState(articleTitleState);

  return (
    <TextInput
      style={styles.form}
      placeholder={"제목 입력"}
      keyboardType={"default"}
      maxLength={30}
      onChangeText={(text) => setTitle(text)}
      value={title}
    />
  );
}

const styles = StyleSheet.create({
  form: {
    fontSize: 30,
    paddingLeft: 15,
  },
});
