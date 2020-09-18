package com.jikgorae.api.article.application.event;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

import com.jikgorae.api.articleorganization.application.ArticleOrganizationService;

@Component
public class ArticleCreatedEventListener
        implements ApplicationListener<ArticleCreatedEvent> {
    private final ArticleOrganizationService articleOrganizationService;

    public ArticleCreatedEventListener(
            ArticleOrganizationService articleOrganizationService) {
        this.articleOrganizationService = articleOrganizationService;
    }

    @TransactionalEventListener
    @Override
    public void onApplicationEvent(ArticleCreatedEvent event) {
        articleOrganizationService.create(event.getArticle(), event.getOrganizations());
    }
}
