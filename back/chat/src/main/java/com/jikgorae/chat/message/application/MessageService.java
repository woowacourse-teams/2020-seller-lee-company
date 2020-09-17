package com.jikgorae.chat.message.application;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.jikgorae.chat.message.domain.Message;
import com.jikgorae.chat.message.domain.MessageRepository;
import com.jikgorae.chat.message.domain.MessageRequestHandlingService;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    private final MessageRequestHandlingService messageRequestHandlingService;

    public MessageService(MessageRepository messageRepository,
            MessageRequestHandlingService messageRequestHandlingService) {
        this.messageRepository = messageRepository;
        this.messageRequestHandlingService = messageRequestHandlingService;
    }

    public MessageResponse save(MessageRequest request) {
        Message save = messageRepository.save(
                messageRequestHandlingService.handle(request).toMessage());
        return MessageResponse.of(save);
    }

    public List<MessageResponse> showAllIn(Long roomId) {
        return MessageResponse.listOf(
                messageRepository.findAllByRoomIdOrderByCreatedTimeDesc(roomId));
    }

    public MessageResponse showLastIn(Long roomId) {
        return MessageResponse.of(messageRepository.findTopByRoomIdOrderByCreatedTimeDesc(roomId)
                .orElse(new Message("", 0L, "", 0L, "",
                        LocalDateTime.of(2010, 1, 1, 1, 1, 1, 1))));
    }
}
