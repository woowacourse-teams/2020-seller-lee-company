package com.jikgorae.api.notification.domain;

public enum NotificationType {
    FAVORITE("님이 회원님의 게시글을 찜 했습니다."),
    CHATTING("님에게 메시지가 왔습니다.");

    private String message;

    NotificationType(String message) {
        this.message = message;
    }

    public String concat(String sender) {
        return sender.concat(message);
    }
}
