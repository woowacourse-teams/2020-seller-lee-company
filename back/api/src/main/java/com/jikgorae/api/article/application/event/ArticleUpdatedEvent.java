package com.jikgorae.api.article.application.event;

import java.util.List;

import com.jikgorae.api.organization.domain.Organization;

public class ArticleUpdatedEvent extends ArticleEvent {
    public ArticleUpdatedEvent(Object source,
            List<Organization> organizations) {
        super(source, organizations);
    }
}
