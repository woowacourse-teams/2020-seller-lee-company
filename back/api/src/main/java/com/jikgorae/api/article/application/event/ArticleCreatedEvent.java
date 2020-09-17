package com.jikgorae.api.article.application.event;

import com.jikgorae.api.article.domain.Article;

public class ArticleCreatedEvent {
    private Article article;

    public ArticleCreatedEvent(Article article) {
        this.article = article;
    }

    public Article getArticle() {
        return article;
    }
}