import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { HomeStackParam, RootStackParam } from "../../types/types";
import theme from "../../colors";
import { StackNavigationProp } from "@react-navigation/stack";

type MyFavoriteButtonNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "ProfileScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function MyFavoriteButton() {
  const navigation = useNavigation<MyFavoriteButtonNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("MyFavoriteScreen")}
      >
        <AntDesign name="hearto" size={22} color={theme.heart} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>찜 목록</Text>
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
    color: theme.heart,
  },
});
