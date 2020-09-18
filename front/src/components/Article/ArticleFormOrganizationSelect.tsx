import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import { HomeStackParam, RootStackParam } from "../../types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { selectedOrganizationsInArticleFormState } from "../../states/articleState";

type ArticleFormGroupSelectNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "ArticleFormScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

interface ArticleFormGroupSelectProp {
  isEditing: boolean;
}

export default function ArticleFormOrganizationSelect({
  isEditing,
}: ArticleFormGroupSelectProp) {
  const navigation = useNavigation<ArticleFormGroupSelectNavigationProp>();
  const selectedOrganization = useRecoilValue(
    selectedOrganizationsInArticleFormState,
  );

  const renderGroup = () => {
    const groupNames = selectedOrganization
      .map((item) => item.name)
      .join(" | ");
    if (isEditing) {
      return groupNames;
    } else {
      return selectedOrganization.length === 0
        ? "조직을 선택하세요."
        : groupNames;
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("OrganizationChoiceScreen")}
    >
      <Text style={styles.buttonText}>{renderGroup()}</Text>
      <Feather
        name="chevron-right"
        size={18}
        color="black"
        style={styles.selectGroupArrowIcon}
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
  selectGroupArrowIcon: {
    alignItems: "center",
  },
});
