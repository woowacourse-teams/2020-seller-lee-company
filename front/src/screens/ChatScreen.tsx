import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { testChatRoomAPI } from "../api/api";
import { useIsFocused } from "@react-navigation/native";

export default function ChatScreen() {
  const isFocused = useIsFocused();

  useEffect(() => {
    const getAllChatRoom = async () => {
      const { data } = await testChatRoomAPI.get();
      console.log(data);
    };
    isFocused ? getAllChatRoom() : null;
  }, [isFocused]);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
  },
});
