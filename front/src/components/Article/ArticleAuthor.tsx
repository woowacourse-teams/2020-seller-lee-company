/**
 * @author lxxjn0
 */

import React from "react";
import { StyleSheet, View } from "react-native";
import AuthorAvatar from "../ArticleDetail/AuthorAvatar";
import AuthorName from "../ArticleDetail/AuthorName";
import AuthorScore from "../ArticleDetail/AuthorScore";
import AuthorTheCheat from "../ArticleDetail/AuthorTheCheat";
import { useRecoilValue } from "recoil/dist";
import { articleSelectedState } from "../../states/articleState";
import { AuthorScoreType } from "../../types/types";

export default function ArticleAuthor() {
  const {
    author: { nickname, avatar, score },
  } = useRecoilValue(articleSelectedState);

  return (
    <View style={styles.container}>
      <View style={styles.authorAvatarContainer}>
        <AuthorAvatar avatar={avatar} />
      </View>
      <View style={styles.authorNameContainer}>
        <AuthorName nickname={nickname} />
      </View>
      <View style={styles.authorScoreContainer}>
        <AuthorScore score={score as AuthorScoreType} />
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
