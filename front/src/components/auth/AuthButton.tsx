import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TeaserScreenNavigationProp } from "../../types/types";
import { Entypo } from "@expo/vector-icons";

export default function AuthButton() {
  const navigation = useNavigation<TeaserScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("AuthScreen")}
    >
      <Text style={styles.title}>시작하기</Text>
      <Entypo name="controller-play" size={14} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 2.8,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 100,
  },
  title: {
    marginHorizontal: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
});
