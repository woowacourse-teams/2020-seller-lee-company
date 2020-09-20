package com.jikgorae.api.notification.application;

import com.jikgorae.api.notification.domain.NotificationType;
import com.jikgorae.api.notification.domain.PushToken;

public class NotificationEvent {
    private final String senderNickname;
    private final PushToken pushToken;
    private final NotificationType notificationType;

    public NotificationEvent(String senderNickname, String pushToken,
            NotificationType notificationType) {
        this.senderNickname = senderNickname;
        this.pushToken = new PushToken(pushToken);
        this.notificationType = notificationType;
    }

    public String makeMessage() {
        return notificationType.concat(senderNickname);
    }

    public String getSenderNickname() {
        return senderNickname;
    }

    public PushToken getPushToken() {
        return pushToken;
    }

    public NotificationType getNotificationType() {
        return notificationType;
    }
}
