package com.jikgorae.chat.message.application;

import com.jikgorae.chat.message.domain.Message;

public class MessageRequest {
    private Long roomId;
    private Long senderId;
    private String senderNickname;
    private String message;
    // TODO: 2020/09/23 pushToken 이슈 해결시, pushToken 추가

    public MessageRequest() {
    }

    public MessageRequest(Long roomId, Long senderId,
            String senderNickname, String message) {
        this.roomId = roomId;
        this.senderId = senderId;
        this.senderNickname = senderNickname;
        this.message = message;
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
}