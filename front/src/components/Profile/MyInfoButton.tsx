import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProfileScreenNavigationProp } from "../../types/types";
import theme from "../../colors";

export default function MyInfoButton() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("MyInfoScreen")}>
        <Text style={styles.title}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 30,
  },
  title: {
    fontSize: 18,
  },
});
