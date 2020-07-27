import React from "react";
import { StyleSheet, View } from "react-native";
import AuthorAvatar from "./AuthorAvatar";
import { mockMembers } from "../data/memberMockData";
import AuthorName from "./AuthorName";
import AuthorScore from "./AuthorScore";
import AuthorTheCheat from "./AuthorTheCheat";

export default function ArticleAuthor() {
  const mockMember = mockMembers[0];

  return (
    <View style={styles.container}>
      <View style={styles.authorAvatarContainer}>
        <AuthorAvatar avatar={mockMember.avatar} />
      </View>
      <View style={styles.authorNameContainer}>
        <AuthorName name={mockMember.name} />
      </View>
      <View style={styles.authorScoreContainer}>
        <AuthorScore score={7} />
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
