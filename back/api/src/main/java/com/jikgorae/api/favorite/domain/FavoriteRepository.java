package com.jikgorae.api.favorite.domain;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jikgorae.api.article.domain.Article;
import com.jikgorae.api.member.domain.Member;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Optional<Favorite> findFavoriteByArticleAndMember(Article article, Member member);

    Long countAllByArticle(Article article);

    long countByArticle(Article article);

    List<Favorite> findAllByMemberAndArticleIn(Member member, List<Article> article);

    void deleteByMemberIdAndArticleId(Long memberId, Long articleId);

    List<Favorite> findAllByMemberId(Long memberId);

    Optional<Favorite> findByArticleId(Long articleId);

    void deleteByArticleId(Long articleId);
}
