import React, { useEffect } from "react";
import MyFavoriteList from "../components/Profile/MyFavoriteList";
import { ProfileScreenNavigationProp } from "../types/types";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";
import { EvilIcons } from "@expo/vector-icons";

export default function MyFavoriteScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

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
