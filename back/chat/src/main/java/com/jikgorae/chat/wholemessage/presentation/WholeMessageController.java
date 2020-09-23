package com.jikgorae.chat.wholemessage.presentation;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.jikgorae.chat.wholemessage.application.WholeMessageRequest;
import com.jikgorae.chat.wholemessage.application.WholeMessageResponse;
import com.jikgorae.chat.wholemessage.application.WholeMessageService;

@Controller
public class WholeMessageController {
    public static final String DESTINATION_OF_ORGANIZATION = "/sub/chat/organizations/";
    public static final String WHOLE_MESSAGE_URI = "/chat/organization/messages";
    public static final String WHOLE_MESSAGE_REST_URI = "/chat/organizations/{organizationId}/messages";

    private final SimpMessageSendingOperations messagingTemplate;
    private final WholeMessageService wholeMessageService;

    public WholeMessageController(SimpMessageSendingOperations messagingTemplate,
            WholeMessageService wholeMessageService) {
        this.messagingTemplate = messagingTemplate;
        this.wholeMessageService = wholeMessageService;
    }

    @MessageMapping(WHOLE_MESSAGE_URI)
    public void message(WholeMessageRequest request) {
        WholeMessageResponse response = wholeMessageService.save(request);
        messagingTemplate.convertAndSend(DESTINATION_OF_ORGANIZATION + request.getRoomId(), response.adjustTime());
    }

    @GetMapping(WHOLE_MESSAGE_REST_URI)
    public ResponseEntity<List<WholeMessageResponse>> showAll(@PathVariable Long organizationId,
            @RequestParam int size, @RequestParam String lastMessageDate) {
        return ResponseEntity.ok(wholeMessageService.showAll(organizationId, size, lastMessageDate));
    }
}
