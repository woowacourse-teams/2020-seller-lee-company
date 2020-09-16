package com.jikgorae.chat.message.presentation;

import java.util.List;
import java.util.Objects;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.jikgorae.chat.message.application.MessageRequest;
import com.jikgorae.chat.message.application.MessageResponse;
import com.jikgorae.chat.message.application.MessageService;

@Controller
public class MessageController {
    private final SimpMessageSendingOperations messagingTemplate;
    private final MessageService messageService;

    public MessageController(SimpMessageSendingOperations messagingTemplate,
            MessageService messageService) {
        this.messagingTemplate = messagingTemplate;
        this.messageService = messageService;
    }

    @MessageMapping("/chat/messages")
    public void message(MessageRequest request) {
        MessageResponse response = messageService.save(request);
        messagingTemplate.convertAndSend("/sub/chat/rooms/" + request.getRoomId(), response);
    }

    @GetMapping("/chat/rooms/{roomId}/messages")
    public ResponseEntity<List<MessageResponse>> showAllIn(@PathVariable Long roomId) {
        return ResponseEntity.ok(messageService.showAllIn(roomId));
    }

    @GetMapping("/chat/rooms/{roomId}/messages/new")
    public ResponseEntity<MessageResponse> showLastIn(@PathVariable Long roomId) {
        return ResponseEntity.ok(messageService.showLastIn(roomId));
    }
}