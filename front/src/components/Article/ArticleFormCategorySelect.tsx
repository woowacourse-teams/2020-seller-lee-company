import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { articleSelectedCategoryState } from "../../states/articleState";
import { useRecoilValue } from "recoil";
import { HomeStackParam, RootStackParam } from "../../types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { categoryIcons } from "../../data/categoryData";

type ArticleFormCategorySelectNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "ArticleContentsFormScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

interface ArticleFormCategorySelectProp {
  isEditing: boolean;
}

export default function ArticleFormCategorySelect({
  isEditing,
}: ArticleFormCategorySelectProp) {
  const navigation = useNavigation<ArticleFormCategorySelectNavigationProp>();

  const selectedCategory = useRecoilValue(articleSelectedCategoryState);

  const getCategoryIcon = () =>
    categoryIcons.filter((value) => value.category === selectedCategory)[0];

  const renderCategory = () => {
    if (isEditing) {
      return selectedCategory;
    } else {
      return selectedCategory === ""
        ? "카테고리"
        : `${getCategoryIcon().icon} ${selectedCategory}`;
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("CategoryChoiceScreen")}
    >
      <Text style={styles.buttonText}>{renderCategory()}</Text>
      <Feather
        name="chevron-down"
        size={18}
        color="black"
        style={styles.selectCategoryArrowIcon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    fontSize: 18,
    textAlign: "left",
  },
  selectCategoryArrowIcon: {
    alignItems: "center",
  },
});
