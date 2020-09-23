package com.jikgorae.common.notification.domain;

import org.springframework.context.ApplicationEvent;

public interface NotificationService {
    String makeMessage(ApplicationEvent applicationEvent);

    PushToken getToken(ApplicationEvent applicationEvent);
}
