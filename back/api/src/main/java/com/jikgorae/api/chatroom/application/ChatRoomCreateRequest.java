package com.jikgorae.api.chatroom.application;

import com.jikgorae.api.chatroom.domain.ChatRoom;

public class ChatRoomCreateRequest {
    private Long articleId;
    private Long buyerId;

    private ChatRoomCreateRequest() {
    }

    public ChatRoomCreateRequest(Long articleId, Long buyerId) {
        this.articleId = articleId;
        this.buyerId = buyerId;
    }

    public ChatRoom toChatRoom() {
        return new ChatRoom(articleId, buyerId);
    }

    public Long getArticleId() {
        return articleId;
    }

    public Long getBuyerId() {
        return buyerId;
    }
}
