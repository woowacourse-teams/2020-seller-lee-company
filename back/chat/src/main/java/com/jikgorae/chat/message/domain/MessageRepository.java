package com.jikgorae.chat.message.domain;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findAllByRoomIdOrderByCreatedTimeDesc(Long roomId);
    Optional<Message> findTopByRoomIdOrderByCreatedTimeDesc(Long roomId);
}
