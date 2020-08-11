/**
 * @author begaonnuri
 */

import React from "react";
import { StyleSheet, View } from "react-native";
import ArticleAuthor from "../components/Article/ArticleAuthor";

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.ArticleAuthorContainer}>
        <ArticleAuthor />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
  },
  ArticleAuthorContainer: {
    marginHorizontal: 10,
  },
});
