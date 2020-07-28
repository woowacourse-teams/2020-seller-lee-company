/**
 * @author lxxjn0
 */

import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { AuthorAvatarType } from "../types/types";

interface AuthorAvatarProps {
  avatar: AuthorAvatarType;
}

export default function AuthorAvatar({ avatar }: AuthorAvatarProps) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{
          uri: avatar.uri,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 100,
  },
});
