import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { articleSelectedCategoryState } from "../../states/articleState";
import { useRecoilValue } from "recoil";
import { ArticleCreateScreenNavigationProp } from "../../types/types";

interface ArticleFormCategorySelectProp {
  isEditing: boolean;
}

export default function ArticleFormCategorySelect({
  isEditing,
}: ArticleFormCategorySelectProp) {
  const navigation = useNavigation<ArticleCreateScreenNavigationProp>();
  const selectedCategory = useRecoilValue(articleSelectedCategoryState);

  const renderCategory = () => {
    if (isEditing) {
      return selectedCategory;
    } else {
      return selectedCategory === "" ? "카테고리" : selectedCategory;
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("CategoryChoiceScreen")}
    >
      <Text style={styles.buttonText}>{renderCategory()}</Text>
      <MaterialCommunityIcons
        name="chevron-down"
        size={22}
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
