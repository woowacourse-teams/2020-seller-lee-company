import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";

/**
 *
 * @author 터틀, 서브웨이
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 30,
  },
});

export default function CategoryHomeScreen({
  navigation,
}: StackScreenProps<ParamListBase, "Detail">) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Category Screen</Text>
      <Button title="move" onPress={() => navigation.push("CategoryDetail")} />
    </View>
  );
}
