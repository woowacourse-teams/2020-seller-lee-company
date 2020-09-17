package com.jikgorae.api.article.application.event;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

import com.jikgorae.api.article.domain.Article;
import com.jikgorae.api.articleorganization.application.ArticleOrganizationService;

@Component
public class ArticleCreatedEventListener {
    private final ArticleOrganizationService articleOrganizationService;

    public ArticleCreatedEventListener(
            ArticleOrganizationService articleOrganizationService) {
        this.articleOrganizationService = articleOrganizationService;
    }

    @EventListener
    public void handle(ArticleCreatedEvent event){
        Article article = event.getArticle();
        articleOrganizationService.create(article, article.getOrganizations());
    }
}

