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
  chatRoom: {
    id: number;
    articleInfo: {
      id: number;
      title: string;
      price: number;
      thumbnail: string;
      tradeState: string;
    };
    opponent: {
      id: number;
      nickname: string;
      avatar: string;
    };
  };
}

export default function ChatRoomItem({ chatRoom }: ChatRoomItemProps) {
  const navigation = useNavigation<ChatRoomItemNavigationProp>();
  const setChatRoom = useSetRecoilState(chatRoomState);
  const nickname = useRecoilValue(memberNicknameState);

  const onClickChatRoom = () => {
    setChatRoom(chatRoom);
    navigation.navigate("ChatScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.item} onPress={onClickChatRoom}>
        {`${chatRoom.opponent.nickname}`}
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
