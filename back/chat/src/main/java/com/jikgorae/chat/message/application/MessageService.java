package com.jikgorae.chat.message.application;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.PageRequest;
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

    public List<MessageResponse> showAll(Long roomId, int size, String lastMessageDate) {
        return MessageResponse.listOf(
                messageRepository.findAllByRoomIdAndCreatedTimeIsBeforeOrderByCreatedTimeDesc(
                        roomId, LocalDateTime.parse(lastMessageDate), PageRequest.of(0, size)));
    }

    public MessageResponse showLast(Long roomId) {
        return MessageResponse.of(messageRepository.findTopByRoomIdOrderByCreatedTimeDesc(roomId)
                .orElse(new Message("", 0L, "", 0L, "",
                        LocalDateTime.of(1, 1, 1, 1, 1, 1, 1))));
    }

    public MessageResponse saveToOrganization(MessageRequest request) {
        WholeMessage save = wholeMessageRepository.save(
                messageRequestHandlingService.handle(request).toWholeMessage());
        return MessageResponse.of(save);
    }

    public List<MessageResponse> showAllInOrganization(Long organizationId, int size, String date) {
        return MessageResponse.listOfWhole(
                wholeMessageRepository.findAllByRoomIdAndCreatedTimeIsBeforeOrderByCreatedTimeDesc(
                        organizationId, LocalDateTime.parse(date), PageRequest.of(0, size)));
    }
}
