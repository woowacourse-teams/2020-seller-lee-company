package com.jikgorae.chat.message.application;

import com.jikgorae.chat.message.domain.Message;

public class MessageRequest {
    private Long roomId;
    private Long senderId;
    private String senderNickname;
    private String message;
    private String pushToken;

    public MessageRequest() {
    }

    public MessageRequest(Long roomId, Long senderId,
            String senderNickname, String message, String pushToken) {
        this.roomId = roomId;
        this.senderId = senderId;
        this.senderNickname = senderNickname;
        this.message = message;
        this.pushToken = pushToken;
    }

    public Message toMessage() {
        return new Message(senderId, senderNickname, roomId, message);
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

    public String getMessage() {
        return message;
    }

    public String getPushToken() {
        return pushToken;
    }
}