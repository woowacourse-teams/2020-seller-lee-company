import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

import { chatRoomAPI } from "../api/api";

import ChatRoomItem from "../components/Chat/ChatRoomItem";
import { useRecoilValue } from "recoil/dist";
import { memberIdState } from "../states/memberState";

export default function ChatRoomListScreen() {
  const memberId = useRecoilValue(memberIdState);
  const [chatRooms, setChatRooms] = useState([
    {
      roomId: 0,
      nickname: "",
    },
  ]);

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
      renderItem={({ item }) => (
        <ChatRoomItem roomId={item.roomId} title={item.nickname} />
      )}
      keyExtractor={(item, index) => `${index}`}
    />
  );
}
