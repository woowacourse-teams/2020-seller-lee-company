package com.jikgorae.api.notification.application;

import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

import com.jikgorae.api.notification.domain.NotificationSender;

@Component
public class NotificationEventListener {
    private final NotificationSender sender;

    public NotificationEventListener(NotificationSender sender) {
        this.sender = sender;
    }

    @TransactionalEventListener
    public void handle(NotificationEvent event) {
        sender.send(event);
    }
}
