package com.jikgorae.chat.message.domain;

import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Message {
    @Id
    private String id;
    private String senderNickname;
    private Long roomId;
    private String content;

    public Message(String id, String senderNickname, Long roomId, String content) {
        this.id = id;
        this.senderNickname = senderNickname;
        this.roomId = roomId;
        this.content = content;
    }

    public Message(String senderNickname, Long roomId, String content) {
        this(null, senderNickname, roomId, content);
    }

    public String getId() {
        return id;
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
}
