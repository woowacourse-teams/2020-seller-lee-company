package sellerlee.back.favorite.domain;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sellerlee.back.article.domain.Article;
import sellerlee.back.member.domain.Member;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Optional<Favorite> findFavoriteByArticleAndMember(Article article, Member member);

    Long countAllByMember(Member member);

    Long countAllByArticle(Article article);

    long countByArticle(Article article);

    List<Favorite> findAllByMemberAndArticleIn(Member member, List<Article> article);

    void deleteByMemberIdAndArticleId(Long memberId, Long articleId);
}
