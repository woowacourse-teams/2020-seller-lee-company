package com.jikgorae.chat.message.application;

import com.jikgorae.chat.message.domain.MessageType;

public class MessageDto {
    private final String roomId;
    private final MessageType messageType;
    private final String sender;
    private final String message;

    public MessageDto(String roomId, MessageType messageType, String sender, String message) {
        this.roomId = roomId;
        this.messageType = messageType;
        this.sender = sender;
        this.message = message;
    }

    public String getRoomId() {
        return roomId;
    }

    public MessageType getMessageType() {
        return messageType;
    }

    public String getSender() {
        return sender;
    }

    public String getMessage() {
        return message;
    }
}