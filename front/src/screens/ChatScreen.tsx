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
import { GiftedChat, Send } from "react-native-gifted-chat";
import { IconButton } from "react-native-paper";
import { useRecoilValue } from "recoil/dist";
import Fire from "../components/Chat/Fire";
import colors from "../colors";
import theme from "../colors";
import { memberAvatarState, memberNicknameState } from "../states/memberState";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const memberNickname = useRecoilValue(memberNicknameState);
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
          onSend={Fire.shared.send}
          showUserAvatar
          alwaysShowSend
          user={{
            name: memberNickname,
            _id: memberNickname,
            avatar: memberAvatar,
          }}
          renderSend={renderSend}
          scrollToBottom
          renderLoading={renderLoading}
          renderUsernameOnMessage={true}
          dateFormat="YYYY년 MM월 DD일"
          timeFormat="HH:mm"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
    fontSize: 26,
    fontWeight: "bold",
    color: theme.black,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.secondary,
  },
  chatContainer: {
    flex: 11,
  },
  sendingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 6,
    alignItems: "center",
    justifyContent: "center",
  },
});
