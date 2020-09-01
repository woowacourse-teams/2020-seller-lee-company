import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProfileScreenNavigationProp } from "../../types/types";
import { Feather } from "@expo/vector-icons";
import theme from "../../colors";

export default function SalesHistory() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("SalesHistoryScreen")}
      >
        <Feather name="archive" size={22} color={theme.primary} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>판매 내역</Text>
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
