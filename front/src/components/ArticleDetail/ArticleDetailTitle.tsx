import React from "react";
import { StyleSheet, Text } from "react-native";
import { useRecoilValue } from "recoil/dist";
import { articleSelectedState } from "../../states/articleState";

export default function ArticleDetailTitle() {
  const { title } = useRecoilValue(articleSelectedState);

  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 23,
    fontWeight: "bold",
  },
});
