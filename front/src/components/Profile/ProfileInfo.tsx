import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileInfo() {
  const nickname = "터틀";
  const email = "turtle@woowabros.com";

  return (
    <View style={styles.container}>
      <Text style={styles.nickname}>{nickname}님, 안녕하세요!</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  nickname: {
    fontSize: 30,
  },
  email: {
    marginTop: 5,
    fontSize: 15,
  },
});
