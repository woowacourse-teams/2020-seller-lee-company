import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation(); // TODO: 타입 지정

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      <Button
        title={"판매 내역"}
        onPress={() => navigation.navigate("SalesHistoryScreen")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 30,
  },
});
