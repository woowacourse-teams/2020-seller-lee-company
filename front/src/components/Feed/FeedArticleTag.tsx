import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface FeedArticleTagProps {
  tag: string;
}

export default function FeedArticleTag({ tag }: FeedArticleTagProps) {
  return (
    <View style={styles.tagItem}>
      <View style={styles.tagItemTextWrapper}>
        <Text>{tag}</Text>
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
