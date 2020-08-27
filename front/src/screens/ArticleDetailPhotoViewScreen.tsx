import React, { useLayoutEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import ArticleDetailPhotoViewSlider from "../components/ArticleDetail/ArticleDetailPhotoViewSlider";
import { HeaderBackButton } from "@react-navigation/stack";
import { ArticleDetailImageViewNavigationProp } from "../types/types";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function ArticleDetailPhotoViewScreen() {
  const navigation = useNavigation<ArticleDetailImageViewNavigationProp>();

  const goBackAndSetStatusBarVisible = () => {
    navigation.goBack();
    StatusBar.setHidden(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: () => undefined,
      headerRight: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={goBackAndSetStatusBarVisible}
          backImage={() => <AntDesign name="close" size={24} color="white" />}
        />
      ),
      headerRightContainerStyle: { paddingRight: 20 },
      headerStyle: {
        backgroundColor: "black",
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
