package com.jikgorae.chat.message.application;

import org.springframework.context.ApplicationEvent;
import org.springframework.stereotype.Service;

import com.jikgorae.chat.message.domain.Message;
import com.jikgorae.common.notification.domain.NotificationService;
import com.jikgorae.common.notification.domain.PushToken;

@Service
public class MessageNotificationService implements NotificationService {
    private static final String DELIMITER = " : ";

    @Override
    public String makeMessage(ApplicationEvent applicationEvent) {
        MessageSentEvent event = (MessageSentEvent)applicationEvent;
        Message message = event.getMessage();

        return message.getSenderNickname() + DELIMITER + message.getContent();
    }

    @Override
    public PushToken getToken(ApplicationEvent applicationEvent) {
        MessageSentEvent event = (MessageSentEvent)applicationEvent;
        return new PushToken(event.getPushToken());
    }
}
