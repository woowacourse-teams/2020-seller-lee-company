import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import HomeCategoryList from "../components/Category/HomeCategoryList";

export default function HomeCategorySelectScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "카테고리 선택",
      headerLeft: () => <></>,
      headerLeftContainerStyle: { paddingLeft: 5 },
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <HomeCategoryList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
