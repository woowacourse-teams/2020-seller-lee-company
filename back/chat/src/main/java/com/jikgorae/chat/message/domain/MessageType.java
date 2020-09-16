package com.jikgorae.chat.message.domain;

import java.util.Arrays;
import java.util.function.Function;

import com.jikgorae.chat.message.application.MessageRequest;

public enum MessageType {
    ENTER(messageRequest -> messageRequest.getSenderId() + "님이 입장 하셨습니다."),
    TALK(MessageRequest::getMessage);

    private final Function<MessageRequest, String> message;

    MessageType(Function<MessageRequest, String> message) {
        this.message = message;
    }

    public static MessageType of(MessageRequest request) {
        return Arrays.stream(values())
                .filter(value -> value.equals(request.getMessageType()))
                .findFirst()
                .orElseThrow(AssertionError::new);
    }

    public String getMessage(MessageRequest messageRequest) {
        return message.apply(messageRequest);
    }
}