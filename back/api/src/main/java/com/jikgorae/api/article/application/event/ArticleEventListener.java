package com.jikgorae.api.article.application.event;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import com.jikgorae.api.articleorganization.application.ArticleOrganizationService;

@Component
public class ArticleEventListener {
    private final ArticleOrganizationService articleOrganizationService;

    public ArticleEventListener(
            ArticleOrganizationService articleOrganizationService) {
        this.articleOrganizationService = articleOrganizationService;
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT, classes = ArticleCreatedEvent.class)
    public void createdArticle(ArticleCreatedEvent event) {
        articleOrganizationService.create(event.article, event.organizations);
    }

    @EventListener
    public void updatedArticle(ArticleUpdatedEvent event) {
        articleOrganizationService.update(event.article, event.organizations);
    }

    @EventListener
    public void deletedArticle(ArticleDeletedEvent event) {
        articleOrganizationService.deleteByArticleId(event.article.getId());
    }
}
