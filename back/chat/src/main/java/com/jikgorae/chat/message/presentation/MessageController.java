package com.jikgorae.chat.message.presentation;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import com.jikgorae.chat.message.application.MessageDto;
import com.jikgorae.chat.message.domain.MessageDtoHandlingService;

@Controller
public class MessageController {
    private final SimpMessageSendingOperations messagingTemplate;
    private final MessageDtoHandlingService messageDtoHandlingService;

    public MessageController(SimpMessageSendingOperations messagingTemplate,
            MessageDtoHandlingService messageDtoHandlingService) {
        this.messagingTemplate = messagingTemplate;
        this.messageDtoHandlingService = messageDtoHandlingService;
    }

    @MessageMapping("/chat/messages")
    public void message(MessageDto request) {
        MessageDto response = messageDtoHandlingService.handle(request);
        messagingTemplate.convertAndSend("/sub/chat/rooms/" + request.getRoomId(), response);
    }
}