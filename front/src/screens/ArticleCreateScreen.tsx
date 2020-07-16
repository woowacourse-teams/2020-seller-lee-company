/**
 * @author begaonnuri
 */

import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ArticleCreateScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState("카테고리 선택");

  const onSelectCategory = (category: string): void => {
    setSelectedCategory(category);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Button
        title={selectedCategory || ""}
        onPress={() =>
          navigation.navigate("CategoryChoiceScreen", {
            onSelectCategory: onSelectCategory,
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});
