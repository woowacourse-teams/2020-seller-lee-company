import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function ProfileInfo() {
  const nickname = "터틀";
  const email = "turtle@woowabros.com";
  const avatar =
    "https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4";

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{ uri: avatar }} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.nickname}>{nickname}님, 안녕하세요!</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 30,
  },
  avatarContainer: { flex: 1 },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  infoContainer: {
    flex: 4,
    paddingLeft: 15,
  },
  nickname: {
    fontSize: 30,
  },
  email: {
    marginTop: 5,
    fontSize: 15,
  },
});
