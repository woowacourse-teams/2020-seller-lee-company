import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import { IconButton } from "react-native-paper";
import { useRecoilValue } from "recoil/dist";
import Fire from "../components/Chat/Fire";
import colors from "../colors";
import { memberAvatarState, memberNicknameState } from "../states/memberState";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const memberNickname: string = useRecoilValue(memberNicknameState);
  const memberAvatar = useRecoilValue(memberAvatarState);

  useEffect(() => {
    Fire.shared.on((message: never[]) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, message),
      );
    });
    return () => Fire.shared.off();
  }, []);

  // @ts-ignore
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon="send-circle" size={32} color={colors.primary} />
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
        {memberNickname === props.currentMessage.user.name ? undefined : (
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
      <View style={styles.chatContainer}>
        <GiftedChat
          messages={messages}
          placeholder={"메세지를 입력해주세요."}
          onSend={Fire.shared.send}
          showUserAvatar
          alwaysShowSend
          user={{
            name: memberNickname,
            _id: memberNickname,
            avatar: memberAvatar,
          }}
          renderSend={renderSend}
          renderLoading={renderLoading}
          renderBubble={renderBubble}
          renderAvatarOnTop={true}
          dateFormat="YYYY년 MM월 DD일"
          scrollToBottom
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
  chatContainer: {
    flex: 1,
    justifyContent: "center",
  },
  sendingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  bubbleContainer: {
    flex: 1,
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
