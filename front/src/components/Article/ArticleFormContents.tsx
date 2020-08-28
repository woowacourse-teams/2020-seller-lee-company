import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useRecoilValue } from "recoil/dist";
import { articleContentsState } from "../../states/articleState";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { HomeStackParam, RootStackParam } from "../../types/types";
import { StackNavigationProp } from "@react-navigation/stack";

type ArticleFormContentsNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "ArticleFormScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function ArticleFormContents() {
  const navigation = useNavigation<ArticleFormContentsNavigationProp>();
  const contents = useRecoilValue(articleContentsState);

  const dynamicStyles = StyleSheet.create({
    contentsText: {
      fontSize: 18,
      color: contents.length === 0 ? "grey" : "black",
    },
  });

  return (
    <TouchableOpacity
      style={styles.contentsFormButton}
      onPress={() => navigation.navigate("ArticleContentsFormScreen")}
    >
      <Text style={dynamicStyles.contentsText}>
        {contents.length === 0 ? "내용을 입력해주세요." : contents}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contentsFormButton: {
    height: "100%",
    marginVertical: 15,
  },
});
