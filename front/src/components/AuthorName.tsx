import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface AuthorNameProps {
  name: string;
}

export default function AuthorName({ name }: AuthorNameProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
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
