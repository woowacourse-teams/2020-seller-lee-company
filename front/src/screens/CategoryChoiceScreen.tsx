import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import CategoryList from "../components/Category/CategoryList";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { HeaderBackButton, StackNavigationProp } from "@react-navigation/stack";
import { EvilIcons } from "@expo/vector-icons";
import { HomeStackParam, RootStackParam } from "../types/types";

type CategoryChoiceScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "CategoryChoiceScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function CategoryChoiceScreen() {
  const navigation = useNavigation<CategoryChoiceScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "카테고리",
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={() => navigation.goBack()}
          backImage={() => (
            <EvilIcons name="chevron-left" size={35} color="black" />
          )}
        />
      ),
      headerLeftContainerStyle: { paddingLeft: 5 },
      headerBackTitleVisible: false,
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
