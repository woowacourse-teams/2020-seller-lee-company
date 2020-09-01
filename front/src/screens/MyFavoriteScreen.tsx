import React, { useEffect } from "react";
import MyFavoriteList from "../components/Profile/MyFavoriteList";
import { HomeStackParam, RootStackParam } from "../types/types";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { HeaderBackButton, StackNavigationProp } from "@react-navigation/stack";
import { EvilIcons } from "@expo/vector-icons";

type MyFavoriteScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "MyFavoriteScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function MyFavoriteScreen() {
  const navigation = useNavigation<MyFavoriteScreenNavigationProp>();

  useEffect(() => {
    navigation.setOptions({
      title: "찜 목록",
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={() => navigation.goBack()}
          backImage={() => (
            <EvilIcons name="chevron-left" size={35} color="black" />
          )}
        />
      ),
    });
  }, []);

  return <MyFavoriteList />;
}
