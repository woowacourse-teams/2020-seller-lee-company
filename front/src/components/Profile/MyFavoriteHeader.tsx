import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function MyFavoriteHeader() {
  return (
    <View style={styles.container}>
      <AntDesign name="hearto" size={24} color="black" />
      <Text style={styles.title}>찜 목록</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
  },
  title: {
    paddingLeft: 10,
    fontSize: 20,
  },
});
