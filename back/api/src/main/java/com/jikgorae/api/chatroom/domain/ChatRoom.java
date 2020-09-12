package com.jikgorae.api.chatroom.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.jikgorae.api.article.domain.Article;
import com.jikgorae.common.member.domain.Member;

@Entity
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_room_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member buyer;

    protected ChatRoom() {
    }

    public ChatRoom(Long id, Article article, Member buyer) {
        this.id = id;
        this.article = article;
        this.buyer = buyer;
    }

    public ChatRoom(Long articleId, Long buyerId) {
        this(null, new Article(articleId), new Member(buyerId));
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
}
