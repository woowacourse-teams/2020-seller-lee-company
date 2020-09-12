package com.jikgorae.api.favorite.application;

public class FavoriteRequest {
    private Long articleId;

    private FavoriteRequest() {
    }

    public FavoriteRequest(Long articleId) {
        this.articleId = articleId;
    }

    public Long getArticleId() {
        return articleId;
    }
}
