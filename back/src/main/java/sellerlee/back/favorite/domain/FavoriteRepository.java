/**
 * @author joseph415
 */

package sellerlee.back.favorite.domain;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sellerlee.back.article.domain.Article;
import sellerlee.back.member.domain.Member;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Optional<Favorite> findFavoriteByArticleAndMember(Article article, Member member);

    Long countAllByArticle(Article article);
}
