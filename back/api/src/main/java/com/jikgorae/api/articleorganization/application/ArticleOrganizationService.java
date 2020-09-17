package com.jikgorae.api.articleorganization.application;

import com.jikgorae.api.article.domain.Article;
import com.jikgorae.api.articleorganization.domain.ArticleOrganization;
import com.jikgorae.api.articleorganization.domain.ArticleOrganizationRepository;
import com.jikgorae.api.organization.domain.Organization;

public class ArticleOrganizationService {
    private final ArticleOrganizationRepository articleOrganizationRepository;

    public ArticleOrganizationService(ArticleOrganizationRepository articleOrganizationRepository) {
        this.articleOrganizationRepository = articleOrganizationRepository;
    }

    public ArticleOrganization create(Article article, Organization organization) {
        ArticleOrganization articleOrganization = new ArticleOrganization(article, organization);
        return articleOrganizationRepository.save(articleOrganization);
    }
}
