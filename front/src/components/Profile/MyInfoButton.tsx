import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ProfileScreenNavigationProp } from "../../types/types";

export default function MyInfoButton() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <AntDesign name="user" size={24} color="black" />
      <TouchableOpacity onPress={() => navigation.navigate("MyInfoScreen")}>
        <Text style={styles.title}>내 정보 수정</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 30,
    padding: 15,
  },
  title: {
    paddingLeft: 10,
    fontSize: 20,
  },
});
