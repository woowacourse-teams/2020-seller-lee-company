package com.jikgorae.api.notification;

import io.github.jav.exposerversdk.PushClient;

public class NotificationEvent {
    private final String senderNickname;
    private final String pushToken;
    private final NotificationType notificationType;

    public NotificationEvent(String senderNickname, String pushToken,
            NotificationType notificationType) {
        this.senderNickname = senderNickname;
        validatePushToken(pushToken);
        this.pushToken = pushToken;
        this.notificationType = notificationType;
    }

    private void validatePushToken(String pushToken) {
        if (!PushClient.isExponentPushToken(pushToken))
            throw new IllegalArgumentException("토큰이 유효하지 않습니다. : " + pushToken);
    }

    public String makeMessage() {
        return notificationType.concat(senderNickname);
    }

    public String getSenderNickname() {
        return senderNickname;
    }

    public String getPushToken() {
        return pushToken;
    }

    public NotificationType getNotificationType() {
        return notificationType;
    }
}
