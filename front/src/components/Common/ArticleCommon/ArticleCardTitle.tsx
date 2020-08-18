import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ArticleCardTitleProps {
  title: string;
}

export default function ArticleCardTitle({ title }: ArticleCardTitleProps) {
  const MAX_LIMIT_TITLE_LENGTH = 47;

  const isOverLengthTitle = () => {
    return title.length > MAX_LIMIT_TITLE_LENGTH;
  };

  const reduceOverLengthTitle = () => {
    return title.substring(0, MAX_LIMIT_TITLE_LENGTH - 3) + "...";
  };

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>
        {isOverLengthTitle() ? reduceOverLengthTitle() : title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 2,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  title: {
    margin: 3,
    fontSize: 14,
    fontWeight: "bold",
  },
});
