package com.jikgorae.chat.message.domain;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface WholeMessageRepository extends MongoRepository<WholeMessage, String> {
    List<WholeMessage> findAllByRoomIdOrderByCreatedTimeDesc(Long roomId);
}
