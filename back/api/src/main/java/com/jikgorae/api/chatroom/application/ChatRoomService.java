package com.jikgorae.api.chatroom.application;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jikgorae.api.chatroom.domain.ChatRoom;
import com.jikgorae.api.chatroom.domain.ChatRoomRepository;
import com.jikgorae.api.member.domain.Member;

@Service
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;

    public ChatRoomService(ChatRoomRepository chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository;
    }

    public Long createChatRoom(ChatRoomCreateRequest request, Member buyer) {
        ChatRoom chatRoom = chatRoomRepository.save(new ChatRoom(request.getArticleId(), buyer, request.getSellerId()));
        return chatRoom.getId();
    }

    public List<ChatRoomResponse> showChatRoomsOf(Long articleId) {
        List<ChatRoom> responses = chatRoomRepository.findChatRoomsByArticleId(articleId);
        return ChatRoomResponse.listOf(responses);
    }
}
