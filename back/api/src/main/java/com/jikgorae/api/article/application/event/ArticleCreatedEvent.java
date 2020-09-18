package com.jikgorae.api.article.application.event;

import java.util.List;

import com.jikgorae.api.organization.domain.Organization;

public class ArticleCreatedEvent extends ArticleEvent {
    public ArticleCreatedEvent(Object source,
            List<Organization> organizations) {
        super(source, organizations);
    }
}
