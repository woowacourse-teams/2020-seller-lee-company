import React from "react";
import { StyleSheet } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { Feather } from "@expo/vector-icons";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParam, RootStackParam } from "../../types/types";
import { DeviceStorage } from "../../auth/DeviceStorage";
import theme from "../../colors";

type ProfileMenuNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "ProfileScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function ProfileMenu() {
  const navigation = useNavigation<ProfileMenuNavigationProp>();

  const onSelectLogout = async () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "TeaserScreen" }],
    });
    await DeviceStorage.clearToken();
  };

  return (
    <Menu>
      <MenuTrigger>
        <Feather name="more-vertical" size={24} color={theme.primary} />
      </MenuTrigger>
      <MenuOptions
        optionsContainerStyle={styles.menuOptions}
        customStyles={{ optionText: styles.menuCustomStyle }}
      >
        <MenuOption
          onSelect={() => navigation.navigate("MyInfoScreen")}
          text={"프로필 수정"}
        />
        <MenuOption onSelect={() => onSelectLogout()} text={"로그아웃"} />
      </MenuOptions>
    </Menu>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuOptions: {
    width: 100,
  },
  menuCustomStyle: {
    textAlign: "center",
    margin: 10,
  },
});
