package com.jikgorae.chat.wholeMessage.application;

import com.jikgorae.chat.wholeMessage.domain.WholeMessage;

public class WholeMessageRequest {
    private Long roomId;
    private Long senderId;
    private String senderNickname;
    private String senderAvatar;
    private String message;

    public WholeMessageRequest() {
    }

    public WholeMessageRequest(Long roomId, Long senderId,
            String senderNickname, String senderAvatar, String message) {
        this.roomId = roomId;
        this.senderId = senderId;
        this.senderNickname = senderNickname;
        this.senderAvatar = senderAvatar;
        this.message = message;
    }

    public Long getRoomId() {
        return roomId;
    }

    public Long getSenderId() {
        return senderId;
    }

    public String getSenderNickname() {
        return senderNickname;
    }

    public String getSenderAvatar() {
        return senderAvatar;
    }

    public String getMessage() {
        return message;
    }

    public WholeMessage toWholeMessage() {
        return new WholeMessage(senderId, senderNickname, senderAvatar, roomId, message);
    }
}
