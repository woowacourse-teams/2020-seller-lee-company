import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProfileScreenNavigationProp } from "../../types/types";
import { AntDesign } from "@expo/vector-icons";

export default function PurchaseHistory() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("PurchaseHistoryScreen")}
      >
        <AntDesign name="shoppingcart" size={30} color="black" />
        <Text style={styles.text}>구매 내역</Text>
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
