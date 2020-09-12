import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import theme from "../../colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParam } from "../../types/types";
import { useNavigation } from "@react-navigation/native";

type GroupEnterButtonNavigationProp = StackNavigationProp<
  RootStackParam,
  "GroupHomeScreen"
>;

export default function GroupEnterButton() {
  const navigation = useNavigation<GroupEnterButtonNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("GroupEnterScreen")}
      >
        <Feather name="log-in" size={32} color={theme.primary} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>조직 입장</Text>
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
