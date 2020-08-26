import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProfileScreenNavigationProp } from "../../types/types";
import { AntDesign } from "@expo/vector-icons";

export default function SalesHistory() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("SalesHistoryScreen")}
      >
        <AntDesign name="inbox" size={30} color="black" />
        <Text style={styles.text}>판매 내역</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginTop: 5,
  },
});
