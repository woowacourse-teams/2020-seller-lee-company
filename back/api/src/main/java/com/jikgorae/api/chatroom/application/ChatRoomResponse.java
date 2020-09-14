package com.jikgorae.api.chatroom.application;

import static java.util.stream.Collectors.*;

import java.util.List;

import com.jikgorae.api.chatroom.domain.ChatRoom;

public class ChatRoomResponse {
    private Long roomId;
    private String avatar;
    private String nickname;

    private ChatRoomResponse() {
    }

    public ChatRoomResponse(Long roomId, String avatar, String nickname) {
        this.roomId = roomId;
        this.avatar = avatar;
        this.nickname = nickname;
    }

    public static ChatRoomResponse of(ChatRoom chatRoom) {
        return new ChatRoomResponse(chatRoom.getId(), chatRoom.getBuyer().getAvatar(), chatRoom.getBuyer().getNickname());
    }

    public static List<ChatRoomResponse> listOf(List<ChatRoom> chatRooms) {
        return chatRooms.stream()
                .map(ChatRoomResponse::of)
                .collect(toList());
    }

    public Long getRoomId() {
        return roomId;
    }

    public String getAvatar() {
        return avatar;
    }

    public String getNickname() {
        return nickname;
    }
}
