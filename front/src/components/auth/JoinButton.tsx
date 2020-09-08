import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParam } from "../../types/types";
import theme from "../../colors";
import { StackNavigationProp } from "@react-navigation/stack";

type JoinButtonNavigationProp = StackNavigationProp<
  RootStackParam,
  "AuthScreen"
>;

export default function JoinButton() {
  const navigation = useNavigation<JoinButtonNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.joinButton}
        onPress={() => navigation.navigate("JoinScreen")}
      >
        <Text style={styles.title}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 6,
  },
  joinButton: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.primary,
  },
});
