package com.jikgorae.chat.room.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.jikgorae.common.BaseTimeEntity;
import com.jikgorae.common.member.domain.Member;

@Entity
public class Room extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long id;

    @Column(name = "seller_id")
    private Long sellerId;

    @Column(name = "buyer_id")
    private Long buyerId;

    protected Room() {
    }

    public Room(Long id, Long sellerId, Long buyerId) {
        this.id = id;
        this.sellerId = sellerId;
        this.buyerId = buyerId;
    }

    public Room(Long sellerId, Long buyerId) {
        this(null, sellerId, buyerId);
    }

    public Long getId() {
        return id;
    }

    public Long getSellerId() {
        return sellerId;
    }

    public Long getBuyerId() {
        return buyerId;
    }
}