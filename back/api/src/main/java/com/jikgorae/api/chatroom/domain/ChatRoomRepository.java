package com.jikgorae.api.chatroom.domain;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    List<ChatRoom> findAllByArticleId(Long articleId);
    Optional<ChatRoom> findOptionalByArticleIdAndSellerIdAndBuyerId(Long articleId, Long sellerId, Long buyerId);
}
