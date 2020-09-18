package com.jikgorae.api.articleorganization.application;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.jikgorae.api.article.domain.Article;
import com.jikgorae.api.articleorganization.domain.ArticleOrganization;
import com.jikgorae.api.articleorganization.domain.ArticleOrganizationRepository;
import com.jikgorae.api.organization.domain.Organization;

@Service
public class ArticleOrganizationService {
    private final ArticleOrganizationRepository articleOrganizationRepository;

    public ArticleOrganizationService(ArticleOrganizationRepository articleOrganizationRepository) {
        this.articleOrganizationRepository = articleOrganizationRepository;
    }

    public void create(Article article, List<Organization> organizations) {
        List<ArticleOrganization> articleOrganizations = organizations.stream()
                .map(organization -> new ArticleOrganization(article, organization))
                .collect(
                        Collectors.toList());
        articleOrganizationRepository.saveAll(articleOrganizations);
    }

    public List<Organization> showByArticle(Long articleId) {
        List<ArticleOrganization> articleOrganizations = articleOrganizationRepository.findAllByArticleId(articleId);
        return articleOrganizations.stream()
                .map(ArticleOrganization::getOrganization)
                .collect(Collectors.toList());
    }
}
