import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil/dist";
import { chatRoomState } from "../states/chatRoomState";
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Bubble, GiftedChat, IMessage, Send } from "react-native-gifted-chat";
import { Feather } from "@expo/vector-icons";
import colors from "../colors";
import theme from "../colors";
import { CHAT_BASE_URL } from "../api/api";
import { memberAvatarState } from "../states/memberState";
import SockJS from "sockjs-client";

const Stomp = require("stompjs/lib/stomp.js").Stomp;

export default function ChatScreen() {
  const { roomId, opponent, me } = useRecoilValue(chatRoomState);
  const [messages, setMessages] = useState([]);
  const memberAvatar = useRecoilValue(memberAvatarState);

  const socket = new SockJS(`${CHAT_BASE_URL}/chat`);
  const stompClient = Stomp.over(socket);

  const appendMessage = useCallback((message = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, message),
    );
  }, []);

  const receiveMessage = (response: { body: string }) => {
    const message = JSON.parse(response.body);
    message ? appendMessage(message) : undefined;
  };

  useEffect(() => {
    const initClient = () => {
      stompClient.connect({}, () =>
        stompClient.subscribe(
          `/sub/api/chat/rooms/${roomId}`,
          receiveMessage,
          {},
        ),
      );
    };

    initClient();

    return () => stompClient && stompClient.disconnect();
  }, []);

  const onSend = (sendMessages: IMessage[]) => {
    stompClient.send(
      "/pub/chat/messages",
      {},
      JSON.stringify({
        roomId,
        messageType: "TALK",
        sender: me.nickname,
        message: sendMessages[0].text,
      }),
    );
    appendMessage(sendMessages);
  };

  // @ts-ignore
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <Feather name="send" size={28} color={colors.primary} />
        </View>
      </Send>
    );
  };

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );

  const renderBubble = (props: any) => {
    return (
      <View>
        {me.nickname === props.currentMessage.user.name ||
        props.currentMessage.user.name ===
          props.previousMessage.user?.name ? undefined : (
          <Text style={styles.userName}>{props.currentMessage.user.name}</Text>
        )}
        <Bubble
          {...props}
          containerStyle={styles.bubbleContainer}
          wrapperStyle={{
            left: {
              backgroundColor: "lightgrey",
            },
            right: {
              backgroundColor: colors.primary,
            },
          }}
          timeTextStyle={{
            left: {
              color: "#000",
            },
            right: {
              color: "#ffffff",
            },
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Chatting</Text>
        {/*<Text style={styles.description}>*/}
        {/*  모든 사용자들이 채팅하는 곳입니다.*/}
        {/*</Text>*/}
      </View>
      <View style={styles.chatContainer}>
        <GiftedChat
          messages={messages}
          placeholder={"메세지를 입력해주세요."}
          onSend={(sendMessages) => onSend(sendMessages)}
          showUserAvatar
          alwaysShowSend
          user={{
            name: me.nickname,
            _id: me.nickname,
            avatar: memberAvatar,
          }}
          renderSend={renderSend}
          renderLoading={renderLoading}
          renderBubble={renderBubble}
          renderAvatarOnTop={true}
          dateFormat="YYYY년 MM월 DD일"
          scrollToBottom
          scrollToBottomComponent={() => (
            <Feather name="chevron-down" size={28} color={colors.primary} />
          )}
          parsePatterns={(linkStyle) => [{ type: "phone", style: linkStyle }]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.primary,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.secondary,
  },
  chatContainer: {
    flex: 12,
  },
  sendingContainer: {
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginRight: 5,
  },
  loadingContainer: {
    flex: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  bubbleContainer: {
    flex: 12,
  },
  userName: {
    flex: 1,
    padding: 7,
  },
  emptySpace: {
    flex: 1,
  },
  profileSpace: { width: 10 },
  avatar: {},
  userInfoContainer: {
    width: 50,
  },
});
