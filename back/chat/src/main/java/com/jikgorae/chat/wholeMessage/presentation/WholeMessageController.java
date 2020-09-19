package com.jikgorae.chat.wholeMessage.presentation;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.jikgorae.chat.wholeMessage.application.WholeMessageRequest;
import com.jikgorae.chat.wholeMessage.application.WholeMessageResponse;
import com.jikgorae.chat.wholeMessage.application.WholeMessageService;

@Controller
public class WholeMessageController {
    private final SimpMessageSendingOperations messagingTemplate;
    private final WholeMessageService wholeMessageService;

    public WholeMessageController(SimpMessageSendingOperations messagingTemplate,
            WholeMessageService wholeMessageService) {
        this.messagingTemplate = messagingTemplate;
        this.wholeMessageService = wholeMessageService;
    }

    @MessageMapping("/chat/organization/messages")
    public void message(WholeMessageRequest request) {
        WholeMessageResponse response = wholeMessageService.save(request);
        messagingTemplate.convertAndSend("/sub/chat/organizations/" + request.getRoomId(),
                response);
    }

    @GetMapping("/chat/organizations/{organizationId}/messages")
    public ResponseEntity<List<WholeMessageResponse>> showAll(@PathVariable Long organizationId,
            @RequestParam int size, @RequestParam String lastMessageDate) {
        return ResponseEntity.ok(
                wholeMessageService.showAll(organizationId, size, lastMessageDate));
    }
}
