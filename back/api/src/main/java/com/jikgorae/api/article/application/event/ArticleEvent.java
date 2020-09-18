package com.jikgorae.api.article.application.event;

import java.util.List;

import org.springframework.context.ApplicationEvent;

import com.jikgorae.api.article.domain.Article;
import com.jikgorae.api.organization.domain.Organization;

public class ArticleEvent extends ApplicationEvent {
    protected final Article article;
    protected final List<Organization> organizations;

    public ArticleEvent(Object source, List<Organization> organizations) {
        super(source);
        this.article = (Article)source;
        this.organizations = organizations;
    }
}
