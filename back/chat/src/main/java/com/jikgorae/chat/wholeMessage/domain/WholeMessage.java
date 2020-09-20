package com.jikgorae.chat.wholeMessage.domain;

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
    private String senderAvatar;
    private Long roomId;
    private String content;
    @CreatedDate
    private LocalDateTime createdTime;

    private WholeMessage() {
    }

    public WholeMessage(String id, Long senderId, String senderNickname,
            String senderAvatar, Long roomId, String content,
            LocalDateTime createdTime) {
        this.id = id;
        this.senderId = senderId;
        this.senderNickname = senderNickname;
        this.senderAvatar = senderAvatar;
        this.roomId = roomId;
        this.content = content;
        this.createdTime = createdTime;
    }

    public WholeMessage(Long senderId, String senderNickname, String senderAvatar, Long roomId, String content) {
        this(null, senderId, senderNickname, senderAvatar, roomId, content, LocalDateTime.MIN);
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

    public String getSenderAvatar() {
        return senderAvatar;
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
