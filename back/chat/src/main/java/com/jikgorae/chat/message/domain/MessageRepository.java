package com.jikgorae.chat.message.domain;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findAllByRoomIdAndCreatedTimeIsBeforeOrderByCreatedTimeDesc(Long roomId,
            LocalDateTime createdTime, PageRequest pageRequest);

    Optional<Message> findTopByRoomIdOrderByCreatedTimeDesc(Long roomId);
}
