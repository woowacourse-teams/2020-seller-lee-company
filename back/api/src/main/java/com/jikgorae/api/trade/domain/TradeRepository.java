package com.jikgorae.api.trade.domain;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jikgorae.common.member.domain.Member;

public interface TradeRepository extends JpaRepository<Trade, Long> {
    List<Trade> findAllByBuyer(Member buyer);
}
