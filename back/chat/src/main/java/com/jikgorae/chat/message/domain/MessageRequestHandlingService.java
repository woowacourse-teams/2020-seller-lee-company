package com.jikgorae.chat.message.domain;

import org.springframework.stereotype.Service;

import com.jikgorae.chat.message.application.MessageRequest;

@Service
public class MessageRequestHandlingService {
    public MessageRequest handle(MessageRequest request) {
        String message = MessageType.of(request).getMessage(request);
        return new MessageRequest(request.getRoomId(), request.getMessageType(),
                request.getSenderId(), request.getSenderNickname(), request.getSenderAvatar(), message);
    }
}