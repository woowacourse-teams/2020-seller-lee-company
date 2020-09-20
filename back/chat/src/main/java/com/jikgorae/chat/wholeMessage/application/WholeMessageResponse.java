package com.jikgorae.chat.wholeMessage.application;

import static java.util.stream.Collectors.*;

import java.time.LocalDateTime;
import java.util.List;

import com.jikgorae.chat.wholeMessage.domain.WholeMessage;

public class WholeMessageResponse {
    private String id;
    private Long senderId;
    private String senderNickname;
    private String senderAvatar;
    private Long roomId;
    private String content;
    private LocalDateTime createdTime;

    public WholeMessageResponse() {
    }

    public WholeMessageResponse(String id, Long senderId, String senderNickname,
            String senderAvatar, Long roomId, String content, LocalDateTime createdTime) {
        this.id = id;
        this.senderId = senderId;
        this.senderNickname = senderNickname;
        this.senderAvatar = senderAvatar;
        this.roomId = roomId;
        this.content = content;
        this.createdTime = createdTime;
    }

    public WholeMessageResponse(String id, Long senderId, String senderNickname, Long roomId,
            String content, LocalDateTime createdTime) {
        this.id = id;
        this.senderId = senderId;
        this.senderNickname = senderNickname;
        this.roomId = roomId;
        this.content = content;
        this.createdTime = createdTime;
    }

    public static WholeMessageResponse of(WholeMessage wholeMessage) {
        return new WholeMessageResponse(wholeMessage.getId(), wholeMessage.getSenderId(),
                wholeMessage.getSenderNickname(), wholeMessage.getSenderAvatar(),
                wholeMessage.getRoomId(), wholeMessage.getContent(),
                wholeMessage.getCreatedTime());
    }

    public static List<WholeMessageResponse> listOf(List<WholeMessage> messages) {
        return messages.stream()
                .map(WholeMessageResponse::of)
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
