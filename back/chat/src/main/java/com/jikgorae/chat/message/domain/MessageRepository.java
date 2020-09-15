package com.jikgorae.chat.message.domain;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findAllByRoomIdOrderByCreatedTimeDesc(Long roomId);
    Message findTopByRoomIdOrderByCreatedTimeDesc(Long roomId);
}
