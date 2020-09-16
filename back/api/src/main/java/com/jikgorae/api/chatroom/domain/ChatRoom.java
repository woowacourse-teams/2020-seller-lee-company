package com.jikgorae.api.chatroom.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.jikgorae.api.article.domain.Article;
import com.jikgorae.api.common.BaseTimeEntity;
import com.jikgorae.api.member.domain.Member;

@Entity
public class ChatRoom extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_room_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private Member buyer;

    @Column(name = "seller_id")
    private Long sellerId;

    protected ChatRoom() {
    }

    public ChatRoom(Long id, Article article, Member buyer, Long sellerId) {
        this.id = id;
        this.article = article;
        this.buyer = buyer;
        this.sellerId = sellerId;
    }

    public ChatRoom(Long articleId, Member buyer, Long selleId) {
        this(null, new Article(articleId), buyer, selleId);
    }

    public Long getId() {
        return id;
    }

    public Article getArticle() {
        return article;
    }

    public Member getBuyer() {
        return buyer;
    }

    public Long getSellerId() {
        return sellerId;
    }
}
