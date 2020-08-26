import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSetRecoilState } from "recoil/dist";
import { useNavigation } from "@react-navigation/native";
import { articleSelectedCategoryState } from "../../states/articleState";
import { CategoryHomeNavigationProp } from "../../types/types";

interface CategoryItemProps {
  title: string;
}

export default function HomeCategoryItem({ title }: CategoryItemProps) {
  const navigation = useNavigation<CategoryHomeNavigationProp>();

  const setSelectedCategory = useSetRecoilState(articleSelectedCategoryState);

  const onClickCategory = () => {
    setSelectedCategory(title);
    navigation.navigate("CategoryHomeScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text} onPress={onClickCategory}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomWidth: 0.3,
    borderBottomColor: "#ccc",
  },
  text: {
    fontSize: 16,
  },
});
