import React from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import HomeCategoryList from "../components/Category/HomeCategoryList";
import { HomeStackParam, RootStackParam } from "../types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import theme from "../colors";

type HomeCategorySelectScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "CategoryHomeSelectedScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function CategoryHomeSelectedScreen() {
  const navigation = useNavigation<HomeCategorySelectScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Categories</Text>
        {/*<Text style={styles.description}>카테고리별 게시글입니다.</Text>*/}
      </View>
      <View style={styles.homeCategoryListContainer}>
        <HomeCategoryList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.primary,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.secondary,
  },
  homeCategoryListContainer: {
    flex: 12,
  },
});
