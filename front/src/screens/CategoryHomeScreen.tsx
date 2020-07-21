/**
 * @author begaonnuri, joseph415
 */

import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CategoryHomeNavigationProp } from "../types/types";

export default function CategoryHomeScreen() {
  const selectedCategoryName = "가전 제품";
  const navigation = useNavigation<CategoryHomeNavigationProp>();

  return (
    <View style={styles.writeButtonContainer}>
      <Text style={styles.text}>Category Screen</Text>
      <Button
        title="move"
        onPress={() =>
          navigation.navigate("CategoryDetail", { title: selectedCategoryName })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  writeButtonContainer: {
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
