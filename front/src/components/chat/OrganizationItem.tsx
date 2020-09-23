import React from "react";

import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { useSetRecoilState } from "recoil/dist";

import theme from "../../colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParam, RootStackParam } from "../../types/types";
import { wholeChatRoomState } from "../../states/chatRoomState";

type OrganizationItemNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "SelectChatScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function OrganizationItem({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  const navigation = useNavigation<OrganizationItemNavigationProp>();
  const setWholeChatRoom = useSetRecoilState(wholeChatRoomState);

  const onClickChatRoom = () => {
    setWholeChatRoom({ id, name });
    navigation.navigate("WholeChatScreen");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onClickChatRoom}>
      <Text style={styles.organizationNickname}>{`${name}`}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 30,
    aspectRatio: 5,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  organizationNickname: {
    paddingVertical: 10,
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
});
