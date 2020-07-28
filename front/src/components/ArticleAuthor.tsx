/**
 * @author lxxjn0
 */

import React from "react";
import { StyleSheet, View } from "react-native";
import AuthorAvatar from "./AuthorAvatar";
import AuthorName from "./AuthorName";
import AuthorScore from "./AuthorScore";
import AuthorTheCheat from "./AuthorTheCheat";
import { AuthorScoreType, AuthorAvatarType } from "../types/types";

interface ArticleAuthorProps {
  name: string;
  score: AuthorScoreType;
  avatar: AuthorAvatarType;
}

export default function ArticleAuthor({
  name,
  score,
  avatar,
}: ArticleAuthorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.authorAvatarContainer}>
        <AuthorAvatar avatar={avatar} />
      </View>
      <View style={styles.authorNameContainer}>
        <AuthorName name={name} />
      </View>
      <View style={styles.authorScoreContainer}>
        <AuthorScore score={score} />
      </View>
      <View style={styles.authorTheCheatContainer}>
        <AuthorTheCheat />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    aspectRatio: 6,
  },
  authorAvatarContainer: {
    marginRight: 10,
  },
  authorNameContainer: {
    flex: 1,
  },
  authorScoreContainer: {
    marginHorizontal: 5,
  },
  authorTheCheatContainer: {
    marginLeft: 5,
  },
});
