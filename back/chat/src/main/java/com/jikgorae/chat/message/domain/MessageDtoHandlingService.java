package com.jikgorae.chat.message.domain;

import org.springframework.stereotype.Service;

import com.jikgorae.chat.message.application.MessageDto;

@Service
public class MessageDtoHandlingService {
    public MessageDto handle(MessageDto request) {
        String message = MessageType.of(request).getMessage(request);
        return new MessageDto(request.getRoomId(), request.getMessageType(), request.getSender(),
                message);
    }
}