import React from "react";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParam, RootStackParam } from "../../types/types";

import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { Feather } from "@expo/vector-icons";

import { StyleSheet } from "react-native";
import { chatRoomAPI } from "../../api/api";
import { useRecoilValue } from "recoil/dist";
import { chatRoomState } from "../../states/chatRoomState";

type ChatMenuNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "ChatScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function ChatMenu() {
  const navigation = useNavigation<ChatMenuNavigationProp>();
  const { id } = useRecoilValue(chatRoomState);

  const exit = async () => {
    await chatRoomAPI.delete(id);
    navigation.goBack();
  };

  return (
    <Menu>
      <MenuTrigger>
        <Feather name="more-vertical" size={24} color={"black"} />
      </MenuTrigger>
      <MenuOptions
        optionsContainerStyle={styles.menuOptions}
        customStyles={{ optionText: styles.menuCustomStyle }}
      >
        <MenuOption onSelect={exit} text={"나가기 "} />
      </MenuOptions>
    </Menu>
  );
}

const styles = StyleSheet.create({
  menuOptions: {
    width: 80,
  },
  menuCustomStyle: {
    textAlign: "center",
    margin: 10,
  },
});
