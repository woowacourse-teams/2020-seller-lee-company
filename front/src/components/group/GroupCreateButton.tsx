import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import theme from "../../colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParam } from "../../types/types";
import { useNavigation } from "@react-navigation/native";

type GroupCreateButtonNavigationProp = StackNavigationProp<
  RootStackParam,
  "GroupHomeScreen"
>;

export default function GroupCreateButton() {
  const navigation = useNavigation<GroupCreateButtonNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("GroupCreateScreen")}
      >
        <Feather name="plus" size={32} color={theme.primary} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>조직 생성</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: theme.border,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    marginTop: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.primary,
  },
});
