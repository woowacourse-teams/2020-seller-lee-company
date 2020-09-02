import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { HomeStackParam, RootStackParam } from "../../types/types";
import { Feather } from "@expo/vector-icons";
import theme from "../../colors";
import { StackNavigationProp } from "@react-navigation/stack";

type PurchaseHistoryNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "ProfileScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function PurchaseHistory() {
  const navigation = useNavigation<PurchaseHistoryNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("PurchaseHistoryScreen")}
      >
        <Feather name="shopping-cart" size={22} color={theme.primary} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>구매 내역</Text>
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
