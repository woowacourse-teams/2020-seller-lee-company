package com.jikgorae.chat.message.application;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.jikgorae.chat.message.domain.Message;
import com.jikgorae.chat.message.domain.MessageRepository;

@Service
public class MessageService {
    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public MessageResponse save(MessageRequest request) {
        Message save = messageRepository.save(request.toMessage());
        return MessageResponse.of(save);
    }

    public List<MessageResponse> showAll(Long roomId, int size, String lastMessageDate) {
        return MessageResponse
                .listOf(messageRepository.findAllByRoomIdAndCreatedTimeIsBeforeOrderByCreatedTimeDesc(
                        roomId, LocalDateTime.parse(lastMessageDate), PageRequest.of(0, size)));
    }

    public MessageResponse showLast(Long roomId) {
        return MessageResponse.of(messageRepository.findTopByRoomIdOrderByCreatedTimeDesc(roomId)
                .orElse(new Message("", 0L, "", 0L, "",
                        LocalDateTime.of(1, 1, 1, 1, 1, 1, 1))));
    }
}
