package com.jikgorae.chat.message.application;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.jikgorae.chat.message.domain.Message;
import com.jikgorae.chat.message.domain.MessageRepository;
import com.jikgorae.chat.message.domain.MessageRequestHandlingService;
import com.jikgorae.chat.message.domain.WholeMessage;
import com.jikgorae.chat.message.domain.WholeMessageRepository;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    private final WholeMessageRepository wholeMessageRepository;
    private final MessageRequestHandlingService messageRequestHandlingService;

    public MessageService(MessageRepository messageRepository,
            WholeMessageRepository wholeMessageRepository,
            MessageRequestHandlingService messageRequestHandlingService) {
        this.messageRepository = messageRepository;
        this.wholeMessageRepository = wholeMessageRepository;
        this.messageRequestHandlingService = messageRequestHandlingService;
    }

    public MessageResponse save(MessageRequest request) {
        Message save = messageRepository.save(
                messageRequestHandlingService.handle(request).toMessage());
        return MessageResponse.of(save);
    }

    public List<MessageResponse> showAll(Long roomId) {
        return MessageResponse.listOf(
                messageRepository.findAllByRoomIdOrderByCreatedTimeDesc(roomId));
    }

    public MessageResponse showLast(Long roomId) {
        return MessageResponse.of(messageRepository.findTopByRoomIdOrderByCreatedTimeDesc(roomId)
                .orElse(new Message("", 0L, "", 0L, "",
                        LocalDateTime.of(2010, 1, 1, 1, 1, 1, 1))));
    }

    public MessageResponse saveToOrganization(MessageRequest request) {
        WholeMessage save = wholeMessageRepository.save(messageRequestHandlingService.handle(request).toWholeMessage());
        return MessageResponse.of(save);
    }

    public List<MessageResponse> showAllInOrganization(Long roomId) {
        return MessageResponse.listOfWhole(wholeMessageRepository.findAllByRoomIdOrderByCreatedTimeDesc(roomId));
    }
}
