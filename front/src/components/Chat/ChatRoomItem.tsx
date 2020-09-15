import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil/dist";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";

import theme from "../../colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParam, RootStackParam } from "../../types/types";

import { chatRoomState } from "../../states/chatRoomState";
import { memberNicknameState } from "../../states/memberState";

type ChatRoomItemNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "ChatRoomListScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

interface ChatRoomItemProps {
  roomId: number;
  title: string;
}

export default function ChatRoomItem({ roomId, title }: ChatRoomItemProps) {
  const navigation = useNavigation<ChatRoomItemNavigationProp>();
  const setChatRoom = useSetRecoilState(chatRoomState);
  const nickname = useRecoilValue(memberNicknameState);

  const onClickChatRoom = () => {
    setChatRoom({
      me: { nickname },
      roomId,
    });
    navigation.navigate("ChatScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.item} onPress={onClickChatRoom}>
        {`${title}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  item: {
    fontSize: 16,
    color: "black",
  },
});
