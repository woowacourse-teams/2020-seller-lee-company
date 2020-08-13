import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TeaserScreenNavigationProp } from "../../types/types";

export default function AuthButton() {
  const navigation = useNavigation<TeaserScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("AuthScreen")}
    >
      <Text style={styles.title}>시작하기</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
  },
  title: {
    fontSize: 14,
  },
});
