package com.jikgorae.chat.message.application;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jikgorae.chat.message.domain.Message;
import com.jikgorae.chat.message.domain.MessageRequestHandlingService;
import com.jikgorae.chat.message.domain.MessageRepository;

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
        System.out.println(save.getId() + save.getContent());
        return MessageResponse.of(save);
    }

    public List<MessageResponse> showAllIn(Long roomId) {
        return MessageResponse.listOf(messageRepository.findAllByRoomId(roomId));
    }
}
