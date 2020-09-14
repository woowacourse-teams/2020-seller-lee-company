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
import { articleSelectedGroupState } from "../../states/articleState";

type ArticleFormGroupSelectNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "ArticleContentsFormScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

interface ArticleFormGroupSelectProp {
  isEditing: boolean;
}

export default function ArticleFormGroupSelect({
  isEditing,
}: ArticleFormGroupSelectProp) {
  const navigation = useNavigation<ArticleFormGroupSelectNavigationProp>();
  const selectedGroup = useRecoilValue(articleSelectedGroupState);

  const renderGroup = () => {
    const groupNames = selectedGroup.map((item) => item.name).join(" | ");
    if (isEditing) {
      return groupNames;
    } else {
      return selectedGroup.length === 0 ? "조직을 선택하세요." : groupNames;
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("GroupChoiceScreen")}
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
