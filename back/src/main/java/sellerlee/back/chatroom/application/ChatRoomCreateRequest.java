package sellerlee.back.chatroom.application;

import sellerlee.back.chatroom.domain.ChatRoom;

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
