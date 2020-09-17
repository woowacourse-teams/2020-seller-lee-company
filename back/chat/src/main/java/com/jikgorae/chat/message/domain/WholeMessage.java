package com.jikgorae.chat.message.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class WholeMessage {
    @Id
    private String id;
    private Long senderId;
    private String senderNickname;
    private Long roomId;
    private String content;
    @CreatedDate
    private LocalDateTime createdTime;

    private WholeMessage() {
    }

    public WholeMessage(String id, Long senderId, String senderNickname, Long roomId, String content,
            LocalDateTime createdTime) {
        this.id = id;
        this.senderId = senderId;
        this.senderNickname = senderNickname;
        this.roomId = roomId;
        this.content = content;
        this.createdTime = createdTime;
    }

    public WholeMessage(Long senderId, String senderNickname, Long roomId, String content) {
        this(null, senderId, senderNickname, roomId, content, LocalDateTime.MIN);
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
