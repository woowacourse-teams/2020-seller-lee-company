package com.jikgorae.api.article.application.event;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import com.jikgorae.api.article.domain.Article;

@Component
public class ArticleCreatedEventPublisher {
    private final ApplicationEventPublisher publisher;

    public ArticleCreatedEventPublisher(ApplicationEventPublisher publisher) {
        this.publisher = publisher;
    }

    void publishEvent(final Article article){
        publisher.publishEvent(new ArticleCreatedEvent(article));
    }
}
