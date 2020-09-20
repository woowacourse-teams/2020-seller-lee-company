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
        // TODO: 2020/09/21 멤버 정보를 조회 해와야한다.
        return null;
    }
}
