package com.jikgorae.chat.message.application;

import org.springframework.context.ApplicationEvent;

import com.jikgorae.chat.message.domain.Message;

public class MessageSentEvent extends ApplicationEvent {
    private final Message message;

    public MessageSentEvent(Object source) {
        super(source);
        this.message = (Message)source;
    }

    public Message getMessage() {
        return message;
    }
}
