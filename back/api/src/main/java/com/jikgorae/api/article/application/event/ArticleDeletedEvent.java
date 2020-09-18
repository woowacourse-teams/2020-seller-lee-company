package com.jikgorae.api.article.application.event;

public class ArticleDeletedEvent extends ArticleEvent {
    public ArticleDeletedEvent(Object source) {
        super(source, null);
    }
}
