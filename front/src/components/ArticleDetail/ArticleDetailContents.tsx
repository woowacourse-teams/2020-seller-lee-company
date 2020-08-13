import React from "react";
import { StyleSheet, Text } from "react-native";
import { useRecoilValue } from "recoil/dist";
import { articleSelectedState } from "../../states/articleState";

export default function ArticleDetailContents() {
  const { contents } = useRecoilValue(articleSelectedState);

  return <Text style={styles.contents}>{contents}</Text>;
}

const styles = StyleSheet.create({
  contents: {
    fontSize: 18,
    fontWeight: "300",
  },
});
