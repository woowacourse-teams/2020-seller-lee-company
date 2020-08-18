import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AuthorNameProps {
  nickname: string;
}

export default function AuthorName({ nickname }: AuthorNameProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{nickname}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
