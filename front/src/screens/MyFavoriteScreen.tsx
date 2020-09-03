import React, { useLayoutEffect } from "react";
import MyFavoriteList from "../components/Profile/MyFavoriteList";
import { HomeStackParam, RootStackParam } from "../types/types";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { HeaderBackButton, StackNavigationProp } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

type MyFavoriteScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "MyFavoriteScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function MyFavoriteScreen() {
  const navigation = useNavigation<MyFavoriteScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "찜 목록",
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
      <MyFavoriteList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
