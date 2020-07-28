/**
 * @author begaonnuri, joseph415
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import ArticleAuthor from "../components/ArticleAuthor";
import { mockMembers } from "../data/memberMockData";
import { AuthorScoreType } from "../types/types";

export default function ChatScreen() {
  const member = mockMembers[0];

  return (
    <View style={styles.container}>
      <View style={styles.ArticleAuthorContainer}>
        <ArticleAuthor
          name={member.name}
          score={member.score as AuthorScoreType}
          avatar={member.avatar}
        />
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
