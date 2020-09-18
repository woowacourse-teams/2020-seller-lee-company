package com.jikgorae.chat.message.application;

import com.jikgorae.chat.message.domain.Message;
import com.jikgorae.chat.message.domain.MessageType;
import com.jikgorae.chat.message.domain.WholeMessage;

public class MessageRequest {
    private Long roomId;
    private MessageType messageType;
    private Long senderId;
    private String senderNickname;
    private String senderAvatar;
    private String message;

    public MessageRequest() {
    }

    public MessageRequest(Long roomId, MessageType messageType, Long senderId,
            String senderNickname, String senderAvatar, String message) {
        this.roomId = roomId;
        this.messageType = messageType;
        this.senderId = senderId;
        this.senderNickname = senderNickname;
        this.senderAvatar = senderAvatar;
        this.message = message;
    }

    public Long getRoomId() {
        return roomId;
    }

    public MessageType getMessageType() {
        return messageType;
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

    public Message toMessage() {
        return new Message(senderId, senderNickname, roomId, message);
    }

    public WholeMessage toWholeMessage() {
        return new WholeMessage(senderId, senderNickname, senderAvatar, roomId, message);
    }
}