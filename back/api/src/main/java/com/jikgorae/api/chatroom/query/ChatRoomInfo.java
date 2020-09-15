package com.jikgorae.api.chatroom.query;

import com.jikgorae.api.article.domain.Article;
import com.jikgorae.api.chatroom.application.ArticleInfo;
import com.jikgorae.api.member.domain.Member;
import com.querydsl.core.annotations.QueryProjection;

public class ChatRoomInfo {
    private Long id;
    private ArticleInfo articleInfo;
    private Member buyer;
    private Member seller;

    public ChatRoomInfo(Long id, ArticleInfo articleInfo, Member buyer,
            Member seller) {
        this.id = id;
        this.articleInfo = articleInfo;
        this.buyer = buyer;
        this.seller = seller;
    }

    @QueryProjection
    public ChatRoomInfo(Long id, Article article, Member buyer, Member seller) {
        this(id, ArticleInfo.of(article), buyer, seller);
    }

    public Long getId() {
        return id;
    }

    public ArticleInfo getArticleInfo() {
        return articleInfo;
    }

    public Member getBuyer() {
        return buyer;
    }

    public Member getSeller() {
        return seller;
    }
}
