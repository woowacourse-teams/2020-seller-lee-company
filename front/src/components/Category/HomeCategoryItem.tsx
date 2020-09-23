import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil/dist";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { articleSelectedCategoryState } from "../../states/articleState";
import { HomeStackParam, RootStackParam } from "../../types/types";
import theme from "../../colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { categoryIcons } from "../../data/categoryData";

type HomeCategoryItemNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "ArticleFormScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

interface CategoryItemProps {
  title: string;
}

export default function HomeCategoryItem({ title }: CategoryItemProps) {
  const navigation = useNavigation<HomeCategoryItemNavigationProp>();

  const [selectedCategory, setSelectedCategory] = useRecoilState(
    articleSelectedCategoryState,
  );

  const onClickCategory = () => {
    setSelectedCategory(title);
    navigation.navigate("CategoryHomeScreen");
  };

  const getCategoryIcon = () =>
    categoryIcons.filter((value) => value.category === title)[0];

  return (
    <View style={styles.container}>
      <Text style={styles.item} onPress={onClickCategory}>
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
  item: {
    fontSize: 16,
    color: "black",
  },
});
