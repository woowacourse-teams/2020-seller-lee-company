import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ProfileScreenNavigationProp } from "../../types/types";

export default function MyFavoriteButton() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <AntDesign name="hearto" size={24} color="black" />
      <TouchableOpacity onPress={() => navigation.navigate("MyFavoriteScreen")}>
        <Text style={styles.title}>찜 목록</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
  },
  title: {
    paddingLeft: 10,
    fontSize: 20,
  },
});
