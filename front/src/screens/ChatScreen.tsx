import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { IconButton } from "react-native-paper";
import { useRecoilValue } from "recoil/dist";
import Fire from "../components/Chat/Fire";
import colors from "../colors";
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
    <View style={styles.container}>
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
});
