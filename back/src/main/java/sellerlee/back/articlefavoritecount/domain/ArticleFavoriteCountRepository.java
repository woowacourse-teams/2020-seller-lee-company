package sellerlee.back.articlefavoritecount.domain;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sellerlee.back.article.domain.Article;

public interface ArticleFavoriteCountRepository extends JpaRepository<ArticleFavoriteCount, Long> {
    Optional<ArticleFavoriteCount> findByArticle(Article article);

    List<ArticleFavoriteCount> findAllByArticleInOrderByArticle(List<Article> article);
}
