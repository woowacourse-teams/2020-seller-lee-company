package com.jikgorae.chat.message.presentation;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

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

    @MessageMapping("/chat/organization/messages")
    public void messageInOrganization(MessageRequest request) {
        MessageResponse response = messageService.saveToOrganization(request);
        messagingTemplate.convertAndSend("/sub/chat/organizations/" + request.getRoomId(), response);
    }

    @GetMapping("/chat/rooms/{roomId}/messages")
    public ResponseEntity<List<MessageResponse>> showAll(@PathVariable Long roomId, @RequestParam int size, @RequestParam String lastMessageDate) {
        return ResponseEntity.ok(messageService.showAll(roomId, size, lastMessageDate));
    }

    @GetMapping("/chat/organizations/{organizationId}/messages")
    public ResponseEntity<List<MessageResponse>> showAllInOrganization(@PathVariable Long organizationId, @RequestParam int size, @RequestParam String lastMessageDate) {
        return ResponseEntity.ok(messageService.showAllInOrganization(organizationId, size, lastMessageDate));
    }

    @GetMapping("/chat/rooms/{roomId}/messages/new")
    public ResponseEntity<MessageResponse> showLast(@PathVariable Long roomId) {
        return ResponseEntity.ok(messageService.showLast(roomId));
    }
}