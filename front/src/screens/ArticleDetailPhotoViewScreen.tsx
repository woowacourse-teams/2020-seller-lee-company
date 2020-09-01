import React, { useLayoutEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import ArticleDetailPhotoViewSlider from "../components/ArticleDetail/ArticleDetailPhotoViewSlider";
import { HeaderBackButton, StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParam, RootStackParam } from "../types/types";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

type ArticleDetailPhotoViewScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "ArticleDetailPhotoViewScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function ArticleDetailPhotoViewScreen() {
  const navigation = useNavigation<
    ArticleDetailPhotoViewScreenNavigationProp
  >();

  const goBackAndSetStatusBarVisible = () => {
    navigation.goBack();
    StatusBar.setHidden(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: () => <></>,
      headerRight: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={goBackAndSetStatusBarVisible}
          backImage={() => <Feather name="x" size={24} color="white" />}
        />
      ),
      headerRightContainerStyle: {
        alignItems: "center",
        justifyContents: "center",
        aspectRatio: 1,
      },
      headerStyle: {
        backgroundColor: "black",
        shadowColor: "black",
      },
    });
    StatusBar.setHidden(true);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ArticleDetailPhotoViewSlider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
