import React from "react";
import { useRecoilValue } from "recoil/dist";
import { chatRoomState } from "../states/chatRoomState";
import { View, Text } from "react-native";

export default function ChatScreen() {
  const { roomId, opponent, me } = useRecoilValue(chatRoomState);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{roomId}</Text>
      <Text>{opponent.id}</Text>
      <Text>{opponent.nickname}</Text>
      <Text>{opponent.avatar}</Text>
      <Text>{me.nickname}</Text>
    </View>
  );
}
