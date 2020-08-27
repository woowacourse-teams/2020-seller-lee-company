import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRecoilValue } from "recoil/dist";
import { articleSelectedState } from "../../../states/articleState";
import calculateDiffTime from "../../../calculateDiffTime";

export default function CategoryAndTime() {
  const { categoryName, createdTime } = useRecoilValue(articleSelectedState);

  return (
    <View style={styles.container}>
      <Text style={styles.category}>{categoryName}</Text>
      <Text style={styles.divider}>|</Text>
      <Text style={styles.createdTime}>{calculateDiffTime(createdTime)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  category: {
    fontSize: 16,
    color: "#888888",
    marginRight: 5,
  },
  divider: {
    fontSize: 16,
    color: "#888888",
  },
  createdTime: {
    fontSize: 16,
    color: "#888888",
    marginLeft: 5,
  },
});
