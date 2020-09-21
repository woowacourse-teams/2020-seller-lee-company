import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { useRecoilState } from "recoil/dist";
import { articleTitleState } from "../../states/articleState";

export default function ArticleFormTitle() {
  const [title, setTitle] = useRecoilState(articleTitleState);

  return (
    <TextInput
      style={styles.form}
      placeholder={"제목"}
      keyboardType={"default"}
      maxLength={30}
      onChangeText={setTitle}
      value={title}
    />
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    width: "100%",
    fontSize: 18,
  },
});
