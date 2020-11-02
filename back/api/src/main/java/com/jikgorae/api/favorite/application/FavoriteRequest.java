package com.jikgorae.api.favorite.application;

import javax.validation.constraints.NotNull;

public class FavoriteRequest {
    @NotNull
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
