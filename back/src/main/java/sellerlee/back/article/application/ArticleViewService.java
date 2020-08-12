/**
 * @author joseph415
 */

package sellerlee.back.article.application;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.ArticleRepository;
import sellerlee.back.favorite.domain.Favorite;
import sellerlee.back.favorite.domain.FavoriteRepository;
import sellerlee.back.member.domain.Member;

@Service
public class ArticleViewService {
    private final ArticleRepository articleRepository;
    private final FavoriteRepository favoriteRepository;

    public ArticleViewService(ArticleRepository articleRepository,
            FavoriteRepository favoriteRepository) {
        this.articleRepository = articleRepository;
        this.favoriteRepository = favoriteRepository;
    }

    @Transactional(readOnly = true)
    public ArticleResponse show(Long articleId, Member loginMember) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다."));

        Optional<Favorite> favorite =
                favoriteRepository.findFavoriteByArticleAndMember(article, loginMember);

        long favoriteCount = favoriteRepository.countAllByArticle(article);

        return ArticleResponse.of(article, favorite.isPresent(), favoriteCount);
    }
}
