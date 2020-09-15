import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSetRecoilState } from "recoil/dist";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";

import theme from "../../colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParam, RootStackParam } from "../../types/types";

import { chatRoomState } from "../../states/chatRoomState";
import ArticleCardImage from "../Common/ArticleCommon/ArticleCardImage";

type ChatRoomItemNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "SelectChatScreen">,
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

  const onClickChatRoom = () => {
    setChatRoom(chatRoom);
    navigation.navigate("ChatScreen");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onClickChatRoom}>
      <View style={styles.articleThumbnailContainer}>
        <ArticleCardImage thumbnail={chatRoom.articleInfo.thumbnail} />
      </View>
      <View style={styles.opponentContainer}>
        <Text style={styles.opponentNickname}>
          {`${chatRoom.opponent.nickname}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    aspectRatio: 5,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  articleThumbnailContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  opponentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  opponentNickname: {
    fontSize: 16,
    color: "black",
  },
});
