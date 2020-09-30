package com.jikgorae.chat.message.presentation;

import static com.jikgorae.chat.config.WebSockConfig.*;

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
    public static final String DESTINATION = SUBSCRIBE + "/chat/rooms/";
    public static final String MESSAGE_URI = "/chat/messages";
    public static final String MESSAGE_REST_URI = "/chat/rooms/{roomId}/messages";
    public static final String NEW = "/new";

    private final SimpMessageSendingOperations messagingTemplate;
    private final MessageService messageService;

    public MessageController(SimpMessageSendingOperations messagingTemplate,
            MessageService messageService) {
        this.messagingTemplate = messagingTemplate;
        this.messageService = messageService;
    }

    @MessageMapping(MESSAGE_URI)
    public void message(MessageRequest request) {
        MessageResponse response = messageService.save(request);
        send(request.getRoomId(), response.adjustTime());
    }

    private synchronized void send(Long roomId, MessageResponse response) {
        messagingTemplate.convertAndSend(DESTINATION + roomId, response);
    }

    @GetMapping(MESSAGE_REST_URI)
    public ResponseEntity<List<MessageResponse>> showAll(@PathVariable Long roomId,
            @RequestParam int size, @RequestParam String lastMessageDate) {
        return ResponseEntity.ok(messageService.showAll(roomId, size, lastMessageDate));
    }

    @GetMapping(MESSAGE_REST_URI + NEW)
    public ResponseEntity<MessageResponse> showLast(@PathVariable Long roomId) {
        MessageResponse response = messageService.showLast(roomId);
        return ResponseEntity.ok(response.adjustTime());
    }
}