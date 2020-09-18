import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParam, RootStackParam } from "../../types/types";
import theme from "../../colors";
import { Feather } from "@expo/vector-icons";

type EnterOrganizationButtonNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "ProfileScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function EnterOrganizationButton() {
  const navigation = useNavigation<EnterOrganizationButtonNavigationProp>();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("OrganizationManageScreen")}
      >
        <Feather name="users" size={22} color={theme.primary} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>조직 입장/생성</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1.5,
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
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.primary,
  },
});
