/**
 * @author begaonnuri
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CategoryItemProps } from "../types/types";
import { useRecoilState } from "recoil/dist";
import { categorySelectedItemState } from "../states/categoryState";
import { useNavigation } from "@react-navigation/native";

export default function CategoryItem({ title }: CategoryItemProps) {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    categorySelectedItemState,
  );

  const onClickCategory = () => {
    setSelectedCategory(title);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text
        style={selectedCategory === title ? styles.selected : {}}
        onPress={onClickCategory}
      >
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 15,
    borderBottomWidth: 0.2,
    borderBottomColor: "#BBB",
  },
  selected: {
    color: "coral",
  },
});
