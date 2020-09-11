package com.jikgorae.api.article.domain;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.jikgorae.common.member.domain.Member;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    Page<Article> findByIdLessThanAndTradeStateOrderByIdDesc(Long lastArticleId,
            TradeState tradeState, Pageable pageRequest);

    Page<Article> findByIdLessThanAndCategoryOrderByIdDesc(Long lastArticleId, Category category,
            Pageable pageRequest);

    List<Article> findAllByTradeState(TradeState tradeState);

    Optional<Article> findByAuthorAndId(Member author, Long id);

    List<Article> findAllByAuthorAndTradeStateNot(Member author, TradeState tradeState);

    List<Article> findAllByAuthorAndTradeState(Member author, TradeState tradeState);
}
