import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

import { chatRoomAPI } from "../api/api";

import ChatRoomItem from "../components/Chat/ChatRoomItem";

export default function ChatRoomListScreen() {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const initChatRoomList = async () => {
      const { data } = await chatRoomAPI.showAllByLoginMember();
      setChatRooms(data);
    };
    initChatRoomList();
  }, []);

  return (
    <FlatList
      data={chatRooms}
      renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
      keyExtractor={(item, index) => `${index}`}
    />
  );
}
