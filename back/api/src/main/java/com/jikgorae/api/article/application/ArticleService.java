package com.jikgorae.api.article.application;

import static com.jikgorae.api.article.exception.AuthorizationException.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jikgorae.api.article.domain.Article;
import com.jikgorae.api.article.domain.ArticleRepository;
import com.jikgorae.api.article.domain.TradeState;
import com.jikgorae.api.article.exception.ArticleNotFoundException;
import com.jikgorae.api.article.exception.AuthorizationException;
import com.jikgorae.api.articleorganization.application.ArticleOrganizationService;
import com.jikgorae.api.member.domain.Member;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final ArticleOrganizationService articleOrganizationService;
    private final ArticleDeleteService articleDeleteService;

    public ArticleService(ArticleRepository articleRepository,
            ArticleOrganizationService articleOrganizationService,
            ArticleDeleteService articleDeleteService) {
        this.articleRepository = articleRepository;
        this.articleOrganizationService = articleOrganizationService;
        this.articleDeleteService = articleDeleteService;
    }

    @Transactional
    public Long create(ArticleRequest request, Member loginMember) {
        Article article = articleRepository.save(request.toArticleWithLoginMember(loginMember));
        articleOrganizationService.create(article, request.getOrganizations());
        return article.getId();
    }

    @Transactional
    public void update(Long id, ArticleRequest request, Member loginMember) {
        Article article = findById(id);
        article.update(request.toArticleWithLoginMember(loginMember));
        articleOrganizationService.update(article, request.getOrganizations());
    }

    @Transactional
    public void deleteById(Long id, Member loginMember) {
        Article article = findById(id);
        if (loginMember.isNotSameId(article.getAuthor())) {
            throw new AuthorizationException(UNAUTHORIZED_TO_DELETE, article.getId(),
                    loginMember.getId());
        }
        articleDeleteService.delete(id);
    }

    private Article findById(Long id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new ArticleNotFoundException(id));
    }

    @Transactional
    public void updateTradeState(Long id, TradeStateRequest request, Member member) {
        Article article = articleRepository.findByAuthorAndId(member, id)
                .orElseThrow(() -> new ArticleNotFoundException(id));
        article.updateTradeState(TradeState.valueOf(request.getTradeState()));
    }
}

