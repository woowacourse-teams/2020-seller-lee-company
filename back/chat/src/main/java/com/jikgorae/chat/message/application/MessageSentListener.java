package com.jikgorae.chat.message.application;

import org.springframework.context.ApplicationListener;

import com.jikgorae.common.notification.domain.PushToken;
import com.jikgorae.common.notification.infra.NotificationSupport;

public class MessageSentListener implements ApplicationListener<MessageSentEvent> {
    private final MessageNotificationService messageNotificationService;
    private final NotificationSupport notificationSupport;

    public MessageSentListener(MessageNotificationService messageNotificationService,
            NotificationSupport notificationSupport) {
        this.messageNotificationService = messageNotificationService;
        this.notificationSupport = notificationSupport;
    }

    @Override
    public void onApplicationEvent(MessageSentEvent event) {
        String message = messageNotificationService.makeMessage(event);
        PushToken token = messageNotificationService.getToken(event);
        notificationSupport.send(token, message);
    }
}
