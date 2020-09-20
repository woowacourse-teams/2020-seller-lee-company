package com.jikgorae.common.notification.domain;

public interface NotificationService {
    String makeMessage(Long articleId);

    PushToken getToken(Long memberId);
}
