import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { articleSelectedCategoryState } from "../states/articleState";
import { useRecoilValue } from "recoil";
import { ArticleCreateScreenNavigationProp } from "../types/types";

export default function ArticleCreateCategorySelect() {
  const selectedCategory = useRecoilValue(articleSelectedCategoryState);
  const navigation = useNavigation<ArticleCreateScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("CategoryChoiceScreen")}
    >
      <Text style={styles.buttonText}>
        {selectedCategory === "" ? "카테고리" : selectedCategory}
      </Text>
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
