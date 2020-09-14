package com.jikgorae.api.chatroom.domain;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jikgorae.api.member.domain.Member;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    List<ChatRoom> findAllByArticleId(Long articleId);
    List<ChatRoom> findAllByBuyerOrSellerId(Member buyer, Long sellerId);
    Optional<ChatRoom> findOptionalByArticleIdAndSellerIdAndBuyerId(Long articleId, Long sellerId, Long buyerId);
}
