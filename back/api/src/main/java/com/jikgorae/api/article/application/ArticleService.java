package com.jikgorae.api.article.application;

import java.util.NoSuchElementException;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jikgorae.api.article.application.event.ArticleCreatedEvent;
import com.jikgorae.api.article.application.event.ArticleDeletedEvent;
import com.jikgorae.api.article.application.event.ArticleUpdatedEvent;
import com.jikgorae.api.article.domain.Article;
import com.jikgorae.api.article.domain.ArticleRepository;
import com.jikgorae.api.article.domain.TradeState;
import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.security.web.AuthorizationException;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final ApplicationEventPublisher eventPublisher;

    public ArticleService(ArticleRepository articleRepository,
            ApplicationEventPublisher eventPublisher) {
        this.articleRepository = articleRepository;
        this.eventPublisher = eventPublisher;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Long create(ArticleRequest request, Member loginMember) {
        Article article = articleRepository.save(request.toArticleWithLoginMember(loginMember));
        eventPublisher.publishEvent(
                new ArticleCreatedEvent(article, request.getOrganizations()));
        return article.getId();
    }

    @Transactional
    public void update(Long id, ArticleRequest request, Member loginMember) {
        Article article = findById(id);
        article.update(request.toArticleWithLoginMember(loginMember));
        eventPublisher.publishEvent(new ArticleUpdatedEvent(article, request.getOrganizations()));
    }

    @Transactional
    public void deleteById(Long id, Member loginMember) {
        Article article = findById(id);
        if (loginMember.isNotSameId(article.getAuthor())) {
            throw new AuthorizationException("삭제할 수 있는 권한이 없습니다.");
        }
        eventPublisher.publishEvent(new ArticleDeletedEvent(article));
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
