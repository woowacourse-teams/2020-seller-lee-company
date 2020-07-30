/**
 * @author kouz95
 */

import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { articleContentsState } from "../states/articleState";
import { useRecoilState } from "recoil/dist";

export default function ArticleContentsFormScreen() {
  const [contents, setContents] = useRecoilState(articleContentsState);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.form}
        placeholder={"내용을 입력해주세요."}
        keyboardType={"default"}
        onChangeText={(text) => setContents(text)}
        value={contents}
        multiline={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    fontSize: 18,
    paddingLeft: 15,
    paddingTop: 15,
  },
});
