package com.jikgorae.chat.message.domain;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message, Long> {
    List<Message> findAllByRoomId(Long roomId);
}
