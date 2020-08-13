import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import theme from "../../colors";

export default function EmailLoginButton() {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>이메일로 로그인하기</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    aspectRatio: 7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  title: {
    fontSize: 12,
    color: theme.primary,
  },
});
