package com.jikgorae.api.chatroom.application;

import java.util.Optional;

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

    public Long create(ChatRoomCreateRequest request, Member buyer) {
        Optional<ChatRoom> chatRoom = chatRoomRepository.findOptionalByArticleIdAndSellerIdAndBuyerId(
                request.getArticleId(), request.getSellerId(), buyer.getId());
        if (chatRoom.isPresent()) {
            return chatRoom.get().getId();
        }

        ChatRoom created = chatRoomRepository.save(
                new ChatRoom(request.getArticleId(), buyer, request.getSellerId()));
        return created.getId();
    }

    public void delete(Long roomId) {
        chatRoomRepository.deleteById(roomId);
    }
}
