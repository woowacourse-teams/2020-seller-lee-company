package com.jikgorae.api.chatroom.application;

import com.jikgorae.api.article.domain.Article;

public class ArticleInfo {
    private Long id;
    private String title;
    private Long price;
    private String thumbnail;
    private String tradeState;

    private ArticleInfo() {
    }

    public ArticleInfo(Long id, String title, Long price, String thumbnail,
            String tradeState) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.tradeState = tradeState;
    }

    public static ArticleInfo of(Article article) {
        return new ArticleInfo(article.getId(), article.getTitle(), article.getPrice(),
                article.getPhotos().toList().get(0), article.getTradeState()
                .getTradeStateName());
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Long getPrice() {
        return price;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public String getTradeState() {
        return tradeState;
    }
}
