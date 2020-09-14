package com.jikgorae.chat.message.application;

import com.jikgorae.chat.message.domain.Message;
import com.jikgorae.chat.message.domain.MessageType;

public class MessageRequest {
    private Long roomId;
    private MessageType messageType;
    private String sender;
    private String message;

    public MessageRequest() {}

    public MessageRequest(Long roomId, MessageType messageType, String sender, String message) {
        this.roomId = roomId;
        this.messageType = messageType;
        this.sender = sender;
        this.message = message;
    }

    public Long getRoomId() {
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

    public Message toMessage() {
        return new Message(sender, roomId, message);
    }
}