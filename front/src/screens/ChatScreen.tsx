import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil/dist";
import { chatRoomState } from "../states/chatRoomState";
import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Bubble, GiftedChat, IMessage, Send } from "react-native-gifted-chat";
import { Feather } from "@expo/vector-icons";
import colors from "../colors";
import theme from "../colors";
import { CHAT_BASE_URL, messageAPI } from "../api/api";
import {
  memberAvatarState,
  memberNicknameState,
  memberIdState,
} from "../states/memberState";
import SockJS from "sockjs-client";

import ArticleCardImage from "../components/Common/ArticleCommon/ArticleCardImage";

import { insertComma } from "../replacePriceWithComma";
import { HeaderBackButton, StackNavigationProp } from "@react-navigation/stack";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { HomeStackParam, RootStackParam } from "../types/types";
import ChatTradeState from "../components/Chat/ChatTradeState";
import { articleSelectedIdState } from "../states/articleState";
import ChatMenu from "../components/Chat/ChatMenu";

const Stomp = require("stompjs/lib/stomp.js").Stomp;

type ChatScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "ChatScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function ChatScreen() {
  const socket = new SockJS(`${CHAT_BASE_URL}/chat`);
  const stompClient = Stomp.over(socket);
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const { id, articleInfo, opponent } = useRecoilValue(chatRoomState);
  const [messages, setMessages] = useState([]);
  const memberId = useRecoilValue(memberIdState);
  const memberNickname = useRecoilValue(memberNicknameState);
  const memberAvatar = useRecoilValue(memberAvatarState);
  const setArticleId = useSetRecoilState(articleSelectedIdState);

  const appendMessage = useCallback((message = []) => {
    if (message.senderId === memberId) {
      return;
    }
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, message),
    );
  }, []);

  const receiveMessage = (response: { body: string }) => {
    const receive = JSON.parse(response.body);
    const message = {
      ...receive,
      _id: receive.id,
      user: {
        _id: receive.senderId,
        nickname: receive.senderNickname,
      },
    };
    message ? appendMessage(message) : undefined;
  };

  useEffect(() => {
    const initClient = () => {
      stompClient.connect({}, () =>
        stompClient.subscribe(`/sub/chat/rooms/${id}`, receiveMessage, {}),
      );
    };

    const initMessages = async () => {
      return await messageAPI.showAll(id);
    };
    initClient();
    initMessages().then((response) => {
      const messageHistory = response.data;
      appendMessage(
        messageHistory.map(
          (prevMessage: {
            id: number;
            content: string;
            senderId: number;
            senderNickname: string;
            createdTime: string;
          }) => {
            return {
              _id: prevMessage.id,
              text: prevMessage.content,
              user: {
                _id: prevMessage.senderId,
                name: prevMessage.senderNickname,
              },
              createdAt: Date.parse(prevMessage.createdTime),
            };
          },
        ),
      );
    });

    return () => stompClient && stompClient.disconnect();
  }, []);

  const onSend = (sendMessages: IMessage[]) => {
    stompClient.send(
      "/pub/chat/messages",
      {},
      JSON.stringify({
        roomId: id,
        messageType: "TALK",
        senderId: memberId,
        senderNickname: memberNickname,
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

  const goToArticle = () => {
    setArticleId(articleInfo.id);
    navigation.navigate("ArticleDetailScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navigationContainer}>
        <HeaderBackButton
          labelVisible={false}
          onPress={navigation.goBack}
          backImage={() => <Feather name="chevron-left" size={24} />}
        />
        <View style={styles.opponentContainer}>
          <Text style={styles.opponent}>{opponent.nickname}님과의 채팅</Text>
        </View>
        <ChatMenu />
      </View>
      <TouchableOpacity style={styles.articleContainer} onPress={goToArticle}>
        <View style={styles.articleImageContainer}>
          <ArticleCardImage thumbnail={articleInfo.thumbnail} />
        </View>
        <View style={styles.articleInfoContainer}>
          <Text style={styles.articleTitle}>{articleInfo.title}</Text>
          <View style={styles.articlePriceAndTradeStateContainer}>
            <ChatTradeState tradeState={articleInfo.tradeState} />
            <View style={styles.articlePriceContainer}>
              <Text style={styles.articlePrice}>{`${insertComma(
                articleInfo.price.toString(),
              )}원`}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.chatContainer}>
        <GiftedChat
          messages={messages}
          placeholder={"메세지를 입력해주세요."}
          onSend={(sendMessages) => onSend(sendMessages)}
          showUserAvatar
          alwaysShowSend
          user={{
            _id: memberId,
            name: memberNickname,
          }}
          renderSend={renderSend}
          renderLoading={renderLoading}
          renderBubble={renderBubble}
          renderAvatar={({ position, imageStyle }) => {
            if (position === "right") {
              return (
                <Image
                  style={StyleSheet.flatten([
                    styles.image,
                    // @ts-ignore
                    imageStyle[position],
                  ])}
                  source={{
                    uri: memberAvatar === "" ? undefined : memberAvatar,
                  }}
                  defaultSource={require("../../assets/user.png")}
                />
              );
            } else {
              return (
                <Image
                  style={StyleSheet.flatten([
                    styles.image,
                    // @ts-ignore
                    imageStyle[position],
                  ])}
                  source={{
                    uri: opponent.avatar === "" ? undefined : opponent.avatar,
                  }}
                  defaultSource={require("../../assets/user.png")}
                />
              );
            }
          }}
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
  navigationContainer: {
    flex: 0.8,
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  opponentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  opponent: {
    fontSize: 18,
    color: "black",
  },
  articleContainer: {
    flex: 1.8,
    flexDirection: "row",
    backgroundColor: "rgb(250,250,250)",
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  articleImageContainer: {
    aspectRatio: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
  articleInfoContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  articleTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  articlePriceAndTradeStateContainer: {
    flex: 1,
    flexDirection: "row",
  },
  articlePriceContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  articlePrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.others,
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
  image: {
    height: 36,
    width: 36,
    borderRadius: 18,
  },
});
