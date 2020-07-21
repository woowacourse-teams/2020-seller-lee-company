/**
 * @author begaonnuri
 */

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue } from "recoil/dist";
import { categorySelectedItemState } from "../states/categoryState";

export default function ArticleCreateScreen() {
  const navigation = useNavigation();
  const selectedCategory = useRecoilValue(categorySelectedItemState);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CategoryChoiceScreen")}
      >
        <Text style={styles.buttonText}>{selectedCategory}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
  button: {
    padding: 20,
    backgroundColor: "#fff",
  },
  buttonText: {
    fontSize: 20,
  },
});
