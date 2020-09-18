package com.jikgorae.api.article.application.event;

import java.util.List;

import org.springframework.context.ApplicationEvent;

import com.jikgorae.api.article.domain.Article;
import com.jikgorae.api.organization.domain.Organization;

public class ArticleCreatedEvent extends ApplicationEvent {
    private final Article article;
    private final List<Organization> organizations;

    public ArticleCreatedEvent(Object source, List<Organization> organizations) {
        super(source);
        this.article = (Article)source;
        this.organizations = organizations;
    }

    public Article getArticle() {
        return article;
    }

    public List<Organization> getOrganizations() {
        return organizations;
    }
}
