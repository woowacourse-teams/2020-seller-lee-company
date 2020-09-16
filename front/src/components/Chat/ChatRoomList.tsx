import React, { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { chatRoomAPI, messageAPI } from "../../api/api";
import ChatRoomItem from "./ChatRoomItem";
import { useFocusEffect } from "@react-navigation/native";

export default function ChatRoomList() {
  const [chatRooms, setChatRooms] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const getNewMessage = async (chatRoomId: number) =>
        await messageAPI.showNew(chatRoomId);

      const initChatRoomList = async () => {
        const { data } = await chatRoomAPI.showAllByLoginMember();
        data.map((chatRoom: { id: number }) => {
          const newMessage = getNewMessage(chatRoom.id);
          return {
            chatRoom,
            newMessage,
          };
        });
        setChatRooms(data);
      };

      const polling = setInterval(initChatRoomList, 6000);
      return () => {
        clearInterval(polling);
      };
    }, []),
  );

  return (
    <FlatList
      data={chatRooms.sort(
        (a, b) =>
          // @ts-ignore
          new Date(a.message.createdTime) - new Date(b.message.createdTime),
      )}
      renderItem={({ item }) => (
        // @ts-ignore
        <ChatRoomItem chatRoom={item.chatRoom} lastMessage={item.newMessage} />
      )}
      keyExtractor={(item, index) => `${index}`}
    />
  );
}
