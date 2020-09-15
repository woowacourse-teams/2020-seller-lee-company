import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSetRecoilState } from "recoil/dist";
import {
  CompositeNavigationProp,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import theme from "../../colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParam, RootStackParam } from "../../types/types";
import { chatRoomState } from "../../states/chatRoomState";
import ArticleCardImage from "../Common/ArticleCommon/ArticleCardImage";
import { messageAPI } from "../../api/api";
import calculateDiffTime from "../../calculateDiffTime";

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
  const [lastMessage, setLastMessage] = useState({
    content: "",
    createdTime: "",
  });
  const isFocused = useIsFocused();

  useEffect(() => {
    const getNewMessage = async () => await messageAPI.showNew(chatRoom.id);
    if (isFocused) {
      getNewMessage().then((response) => {
        setLastMessage({
          content: response.data.content,
          createdTime: response.data.createdTime,
        });
      });
    }
  }, [isFocused]);

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
        <View style={styles.opponentTopContainer}>
          <Text style={styles.opponentNickname}>
            {`${chatRoom.opponent.nickname}`}
          </Text>
          <Text style={styles.diffTime}>{`${calculateDiffTime(
            lastMessage.createdTime,
          )}`}</Text>
        </View>
        <Text style={styles.lastMessage}>{`${lastMessage.content}`}</Text>
        <ArticleCardImage thumbnail={chatRoom.articleInfo.thumbnail} />
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
    flex: 5,
    alignItems: "flex-start",
  },
  opponentTopContainer: {
    flexDirection: "row",
  },
  opponentNickname: {
    paddingVertical: 10,
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  diffTime: {
    paddingVertical: 11,
    paddingHorizontal: 10,
    fontSize: 14,
    color: "rgb(80,80,80)",
  },
  lastMessage: {
    fontSize: 16,
    color: "rgb(80,80,80)",
  },
});
