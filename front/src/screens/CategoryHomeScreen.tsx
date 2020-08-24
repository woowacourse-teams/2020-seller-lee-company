import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CategoryHomeNavigationProp } from "../types/types";
import { useRecoilValue } from "recoil/dist";
import { articleSelectedCategoryState } from "../states/articleState";

export default function CategoryHomeScreen() {
  const navigation = useNavigation<CategoryHomeNavigationProp>();
  const selectedCategoryName = useRecoilValue(articleSelectedCategoryState);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{selectedCategoryName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 30,
  },
});
