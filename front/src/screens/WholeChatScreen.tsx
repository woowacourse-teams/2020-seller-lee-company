import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil/dist";
import { wholeChatRoomState } from "../states/chatRoomState";
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
import { CHAT_BASE_URL, messageAPI } from "../api/api";
import SockJS from "sockjs-client";
import { HeaderBackButton, StackNavigationProp } from "@react-navigation/stack";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { HomeStackParam, RootStackParam } from "../types/types";
import {
  memberAvatarState,
  memberIdState,
  memberNicknameState,
} from "../states/memberState";

const moment = require("moment");
require("moment-timezone");
const Stomp = require("stompjs/lib/stomp.js").Stomp;

type WholeChatScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "WholeChatScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function WholeChatScreen() {
  const socket = new SockJS(`${CHAT_BASE_URL}/chat`);
  const stompClient = Stomp.over(socket);
  const navigation = useNavigation<WholeChatScreenNavigationProp>();
  const { id, name } = useRecoilValue(wholeChatRoomState);
  const [messages, setMessages] = useState([]);
  const memberId = useRecoilValue(memberIdState);
  const memberNickname = useRecoilValue(memberNicknameState);
  const memberAvatar = useRecoilValue(memberAvatarState);
  const [hasMoreMessage, setHasMoreMessage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const pushMessage = useCallback((message = []) => {
    if (message.senderId === memberId) {
      return;
    }
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, message),
    );
  }, []);

  const appendMessage = useCallback((message = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(message, previousMessages),
    );
    setIsLoading(false);
  }, []);

  const receiveMessage = (response: { body: string }) => {
    const receive = JSON.parse(response.body);
    const message = {
      ...receive,
      _id: receive.id,
      user: {
        _id: receive.senderId,
        nickname: receive.senderNickname,
        avatar: receive.senderAvatar,
      },
    };
    message ? pushMessage(message) : undefined;
  };

  useEffect(() => {
    const initClient = () => {
      stompClient.connect({}, () =>
        stompClient.subscribe(
          `/sub/chat/organizations/${id}`,
          receiveMessage,
          {},
        ),
      );
    };
    initClient();

    const initMessages = async () => {
      return await messageAPI.showAllInOrganization(
        id,
        20,
        moment().tz("Asia/Seoul").format(),
      );
    };

    initMessages().then((response) => {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      const messageHistory = response.data;
      appendMessage(
        messageHistory.map(
          (prevMessage: {
            id: number;
            content: string;
            senderId: number;
            senderNickname: string;
            senderAvatar: string;
            createdTime: string;
          }) => {
            return {
              _id: prevMessage.id,
              text: prevMessage.content,
              user: {
                _id: prevMessage.senderId,
                name: prevMessage.senderNickname,
                avatar: prevMessage.senderAvatar,
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
      "/pub/chat/organization/messages",
      {},
      JSON.stringify({
        roomId: id,
        messageType: "TALK",
        senderId: memberId,
        senderNickname: memberNickname,
        senderAvatar: memberAvatar,
        message: sendMessages[0].text,
      }),
    );
    pushMessage(sendMessages);
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

  // @ts-ignore
  const renderNickname = ({ position, previousMessage, currentMessage }) => {
    if (position === "right") return <></>;
    if (!previousMessage.user) {
      return <Text style={styles.userName}>{currentMessage.user.name}</Text>;
    }
    const isUpdated = () =>
      previousMessage.user._id === currentMessage.user._id &&
      (previousMessage.user.name !== currentMessage.user.name ||
        previousMessage.user.avatar !== currentMessage.user.avatar);
    if (isUpdated()) {
      previousMessage.user.name = currentMessage.user.name;
      previousMessage.user.avatar = currentMessage.user.avatar;
    }

    const isTop = () =>
      !previousMessage || previousMessage.user._id !== currentMessage.user._id;

    if (isTop()) {
      return <Text style={styles.userName}>{currentMessage.user.name}</Text>;
    }
  };

  const renderBubble = (props: any) => {
    return (
      <View>
        {renderNickname(props)}
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

  // @ts-ignore
  const isCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToTop = 80;
    return (
      contentSize.height - layoutMeasurement.height - paddingToTop <=
      contentOffset.y
    );
  };

  const loadMore = async () => {
    if (isLoading) {
      return;
    }
    if (hasMoreMessage) {
      setIsLoading(true);
      const { data } = await messageAPI.showAllInOrganization(
        id,
        20,
        // @ts-ignore
        moment(messages[messages.length - 1].createdAt)
          .tz("Asia/Seoul")
          .format(),
      );
      if (data.length === 0) {
        setHasMoreMessage(false);
      }

      appendMessage(
        data.map(
          (prevMessage: {
            id: number;
            content: string;
            senderId: number;
            senderNickname: string;
            senderAvatar: string;
            createdTime: string;
          }) => {
            return {
              _id: prevMessage.id,
              text: prevMessage.content,
              user: {
                _id: prevMessage.senderId,
                name: prevMessage.senderNickname,
                avatar: prevMessage.senderAvatar,
              },
              createdAt: Date.parse(prevMessage.createdTime),
            };
          },
        ),
      );
    }
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
          <Text style={styles.opponent}>{name}</Text>
        </View>
      </View>
      <View style={styles.chatContainer}>
        <GiftedChat
          messages={messages}
          listViewProps={{
            scrollEventThrottle: 400,
            // @ts-ignore
            onScroll: ({ nativeEvent }) => {
              if (isCloseToTop(nativeEvent)) {
                loadMore();
              }
            },
          }}
          placeholder={"메세지를 입력해주세요."}
          onSend={(sendMessages) => onSend(sendMessages)}
          alwaysShowSend
          user={{
            _id: memberId,
            name: memberNickname,
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
    fontSize: 16,
    marginLeft: 5,
    marginBottom: 10,
    fontWeight: "bold",
  },
  image: {
    height: 36,
    width: 36,
    borderRadius: 18,
  },
});
