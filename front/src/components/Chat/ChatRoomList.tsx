import React, { useCallback, useState } from "react";
import { chatRoomAPI, messageAPI } from "../../api/api";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native";
import ChatRoomItem from "./ChatRoomItem";

export default function ChatRoomList() {
  const [chatRooms, setChatRooms] = useState([
    {
      chatRoom: {
        id: 0,
        articleInfo: {
          id: 0,
          title: "",
          price: 0,
          thumbnail: "",
          tradeState: "",
        },
        opponent: {
          id: 0,
          nickname: "",
          avatar: "",
        },
      },
      newMessage: {
        createdTime: "",
        content: "",
      },
    },
  ]);

  useFocusEffect(
    useCallback(() => {
      const getNewMessage = async (chatRoomId: number) =>
        await messageAPI.showNew(chatRoomId);

      const initChatRoomList = async () => {
        const { data } = await chatRoomAPI.showAllByLoginMember();
        setChatRooms(
          await Promise.all(
            data.map(async (chatRoom: { id: number }) => {
              const { data: newMessage } = await getNewMessage(chatRoom.id);
              return {
                chatRoom,
                newMessage,
              };
            }),
          ),
        );
      };
      initChatRoomList();

      const polling = setInterval(initChatRoomList, 30 * 1000);
      return () => {
        clearInterval(polling);
      };
    }, []),
  );

  return (
    <FlatList
      data={chatRooms.sort(
        (a, b) =>
          new Date(b.newMessage.createdTime).getTime() -
          new Date(a.newMessage.createdTime).getTime(),
      )}
      renderItem={({ item }) => (
        <ChatRoomItem chatRoom={item.chatRoom} newMessage={item.newMessage} />
      )}
      keyExtractor={(item, index) => `${index}`}
    />
  );
}
