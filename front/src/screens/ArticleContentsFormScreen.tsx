/**
 * @author kouz95
 */

import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { articleContentsState } from "../states/articleState";
import { useRecoilState } from "recoil/dist";

export default function ArticleContentsFormScreen() {
  const [contents, setContents] = useRecoilState(articleContentsState);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.form}
        placeholder={"내용 입력"}
        keyboardType={"default"}
        onChangeText={(text) => setContents(text)}
        value={contents}
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
