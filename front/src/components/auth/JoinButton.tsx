import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function JoinButton() {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  title: {
    fontSize: 12,
    color: "white",
  },
});
