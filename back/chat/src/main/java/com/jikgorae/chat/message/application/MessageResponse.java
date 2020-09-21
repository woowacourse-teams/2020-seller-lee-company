package com.jikgorae.chat.message.application;

import static java.util.stream.Collectors.*;

import java.time.LocalDateTime;
import java.util.List;

import com.jikgorae.chat.message.domain.Message;

public class MessageResponse {
    private String id;
    private Long senderId;
    private String senderNickname;
    private Long roomId;
    private String content;
    private LocalDateTime createdTime;

    public MessageResponse() {
    }

    public MessageResponse(String id, Long senderId, String senderNickname, Long roomId, String content, LocalDateTime createdTime) {
        this.id = id;
        this.senderId = senderId;
        this.senderNickname = senderNickname;
        this.roomId = roomId;
        this.content = content;
        this.createdTime = createdTime;
    }

    public static MessageResponse of(Message message) {
        return new MessageResponse(message.getId(), message.getSenderId(),
                message.getSenderNickname(), message.getRoomId(), message.getContent(),
                message.getCreatedTime());
    }

    public static List<MessageResponse> listOf(List<Message> messages) {
        return messages.stream()
                .map(MessageResponse::of)
                .collect(toList());
    }

    public String getId() {
        return id;
    }

    public Long getSenderId() {
        return senderId;
    }

    public String getSenderNickname() {
        return senderNickname;
    }

    public Long getRoomId() {
        return roomId;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }
}
