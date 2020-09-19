package com.jikgorae.chat.message.application;

import com.jikgorae.chat.message.domain.Message;

public class MessageRequest {
    private Long roomId;
    private Long senderId;
    private String senderNickname;
    private String message;

    public MessageRequest() {
    }

    public MessageRequest(Long roomId, Long senderId,
            String senderNickname, String message) {
        this.roomId = roomId;
        this.senderId = senderId;
        this.senderNickname = senderNickname;
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

    public String getMessage() {
        return message;
    }

    public Message toMessage() {
        return new Message(senderId, senderNickname, roomId, message);
    }
}