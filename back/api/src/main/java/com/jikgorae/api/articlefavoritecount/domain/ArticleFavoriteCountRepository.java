package com.jikgorae.api.articlefavoritecount.domain;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jikgorae.api.article.domain.Article;

public interface ArticleFavoriteCountRepository extends JpaRepository<ArticleFavoriteCount, Long> {
    Optional<ArticleFavoriteCount> findByArticle(Article article);

    List<ArticleFavoriteCount> findAllByArticleInOrderByArticle(List<Article> article);
}
