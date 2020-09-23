package com.jikgorae.api.article.application;

import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jikgorae.api.article.domain.Article;
import com.jikgorae.api.article.domain.ArticleRepository;
import com.jikgorae.api.article.domain.TradeState;
import com.jikgorae.api.articlefavoritecount.application.ArticleFavoriteCountService;
import com.jikgorae.api.articleorganization.application.ArticleOrganizationService;
import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.security.web.AuthorizationException;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final ArticleOrganizationService articleOrganizationService;
    private final ArticleFavoriteCountService articleFavoriteCountService;

    public ArticleService(ArticleRepository articleRepository,
            ArticleOrganizationService articleOrganizationService,
            ArticleFavoriteCountService articleFavoriteCountService) {
        this.articleRepository = articleRepository;
        this.articleOrganizationService = articleOrganizationService;
        this.articleFavoriteCountService = articleFavoriteCountService;
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
            throw new AuthorizationException("삭제할 수 있는 권한이 없습니다.");
        }
        articleOrganizationService.deleteByArticleId(id);
        articleFavoriteCountService.deleteByArticleId(id);
        articleRepository.deleteById(id);
    }

    private Article findById(Long id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("게시글이 존재하지 않습니다."));
    }

    @Transactional
    public void updateTradeState(Long id, TradeStateRequest request, Member member) {
        Article article = articleRepository.findByAuthorAndId(member, id)
                .orElseThrow(() -> new IllegalArgumentException("id에 해당하는 article이 존재하지 않습니다."));
        article.updateTradeState(TradeState.valueOf(request.getTradeState()));
    }
}
