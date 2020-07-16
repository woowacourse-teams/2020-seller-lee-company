/**
 * @author begaonnuri
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CategoryItemProps } from "../types";

export default function CategoryItem({
  title,
  onSelectCategory,
}: CategoryItemProps) {
  const onClickCategory = (e: any): void => {
    onSelectCategory(e.target.innerText);
  };

  return (
    <View style={styles.container}>
      <Text onPress={onClickCategory}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 0.2,
    borderBottomColor: "#BBB",
  },
});
