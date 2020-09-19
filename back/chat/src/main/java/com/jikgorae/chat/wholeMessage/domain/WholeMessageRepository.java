package com.jikgorae.chat.wholeMessage.domain;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WholeMessageRepository extends MongoRepository<WholeMessage, String> {
    List<WholeMessage> findAllByRoomIdAndCreatedTimeIsBeforeOrderByCreatedTimeDesc(Long roomId,
            LocalDateTime createdTime, PageRequest pageRequest);
}
