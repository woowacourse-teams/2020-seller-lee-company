/**
 * @author kouz95
 */

import React, { useLayoutEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import ArticleDetailImageViewSlider from "../components/ArticleDetailImageViewSlider";
import { HeaderBackButton } from "@react-navigation/stack";
import {
  ArticleDetailImageViewNavigationProp,
  ArticleDetailImageViewRouteProp,
} from "../types/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function ArticleDetailImageViewScreen() {
  const navigation = useNavigation<ArticleDetailImageViewNavigationProp>();
  const route = useRoute<ArticleDetailImageViewRouteProp>();

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
  }, [navigation, route]);
  return (
    <View style={styles.container}>
      <ArticleDetailImageViewSlider photos={route.params.photos} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
