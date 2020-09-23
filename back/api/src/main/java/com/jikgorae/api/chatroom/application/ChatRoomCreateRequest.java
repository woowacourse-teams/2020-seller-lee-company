package com.jikgorae.api.chatroom.application;

public class ChatRoomCreateRequest {
    private Long articleId;
    private Long sellerId;

    private ChatRoomCreateRequest() {
    }

    public ChatRoomCreateRequest(Long articleId, Long sellerId) {
        this.articleId = articleId;
        this.sellerId = sellerId;
    }

    public Long getArticleId() {
        return articleId;
    }

    public Long getSellerId() {
        return sellerId;
    }
}
