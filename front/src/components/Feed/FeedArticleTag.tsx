import React from "react";
import { StyleSheet, Text, View } from "react-native";
import theme from "../../colors";

interface FeedArticleTagProps {
  tag: string;
}

export default function FeedArticleTag({ tag }: FeedArticleTagProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.tagText}>{tag}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 5,
  },
  tagText: {
    fontSize: 15,
    color: theme.secondary,
  },
});
