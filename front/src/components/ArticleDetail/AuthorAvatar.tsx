import React from "react";
import { Image, StyleSheet, View } from "react-native";

interface AuthorAvatarProps {
  avatar: string;
}

export default function AuthorAvatar({ avatar }: AuthorAvatarProps) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{
          uri: avatar ? avatar : "",
        }}
        defaultSource={require("../../../assets/user.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
  },
  avatar: {
    flex: 1,
    resizeMode: "cover",
    borderRadius: 100,
  },
});
