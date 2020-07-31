/**
 * @author joseph415
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TagItemProps } from "../types/types";

export default function FeedArticleTag({ tagItem }: TagItemProps) {
  return (
    <View style={styles.tagItem}>
      <View style={styles.tagItemTextWrapper}>
        <Text>{tagItem.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tagItem: {
    flexDirection: "row",
    alignItems: "center",
    height: "80%",
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: "#eeecda",
  },
  tagItemTextWrapper: {
    paddingHorizontal: 3,
  },
});
