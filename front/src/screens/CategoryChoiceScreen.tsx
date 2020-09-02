import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import CategoryList from "../components/Category/CategoryList";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { HeaderBackButton, StackNavigationProp } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import { HomeStackParam, RootStackParam } from "../types/types";

type CategoryChoiceScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "CategoryChoiceScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function CategoryChoiceScreen() {
  const navigation = useNavigation<CategoryChoiceScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "카테고리 선택",
      headerTitleAlign: "left",
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={() => navigation.goBack()}
          backImage={() => (
            <Feather name="chevron-left" size={24} color="black" />
          )}
        />
      ),
      headerLeftContainerStyle: {
        alignItems: "center",
        justifyContents: "center",
        aspectRatio: 1,
      },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <CategoryList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
