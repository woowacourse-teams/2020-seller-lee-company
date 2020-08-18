import React from "react";
import { StyleSheet, Text } from "react-native";
import { useRecoilValue } from "recoil/dist";
import { articleSelectedState } from "../../../states/articleState";
import calculateDiffTime from "../../../calculateDiffTime";

export default function CategoryAndTime() {
  const { categoryName, createdTime } = useRecoilValue(articleSelectedState);

  return (
    <Text style={styles.text}>
      {categoryName} | {calculateDiffTime(createdTime)}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: "#888888",
  },
});
