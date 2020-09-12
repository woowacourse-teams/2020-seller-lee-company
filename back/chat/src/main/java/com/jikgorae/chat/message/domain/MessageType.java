package com.jikgorae.chat.message.domain;

import java.util.Arrays;
import java.util.function.Function;

import com.jikgorae.chat.message.application.MessageDto;

public enum MessageType {
    ENTER(messageDto -> messageDto.getSender() + "님이 입장 하셨습니다."),
    TALK(MessageDto::getMessage);

    private final Function<MessageDto, String> message;

    MessageType(Function<MessageDto, String> message) {
        this.message = message;
    }

    public static MessageType of(MessageDto request) {
        return Arrays.stream(values())
                .filter(value -> value.equals(request.getMessageType()))
                .findFirst()
                .orElseThrow(AssertionError::new);
    }

    public String getMessage(MessageDto messageDto) {
        return message.apply(messageDto);
    }
}