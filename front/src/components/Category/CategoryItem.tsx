import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil/dist";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { articleSelectedCategoryState } from "../../states/articleState";
import theme from "../../colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParam, RootStackParam } from "../../types/types";
import { categoryIcons } from "../../data/categoryData";

type CategoryItemNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "CategoryChoiceScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

interface CategoryItemProps {
  title: string;
}

export default function CategoryItem({ title }: CategoryItemProps) {
  const navigation = useNavigation<CategoryItemNavigationProp>();
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    articleSelectedCategoryState,
  );

  const onClickCategory = () => {
    setSelectedCategory(title);
    navigation.goBack();
  };

  const getCategoryIcon = () =>
    categoryIcons.filter((value) => value.category === title)[0];

  return (
    <View style={styles.container}>
      <Text
        style={selectedCategory === title ? styles.selected : styles.item}
        onPress={onClickCategory}
      >
        {`${getCategoryIcon().icon} ${title}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  selected: {
    fontSize: 16,
    color: theme.primary,
  },
  item: {
    fontSize: 16,
    color: "black",
  },
});
