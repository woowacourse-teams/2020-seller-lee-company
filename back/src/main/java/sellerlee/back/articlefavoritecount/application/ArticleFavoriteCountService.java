/**
 * @author kouz95
 */

package sellerlee.back.articlefavoritecount.application;

import static org.springframework.data.util.Optionals.*;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import sellerlee.back.article.domain.Article;
import sellerlee.back.articlefavoritecount.domain.ArticleFavoriteCount;
import sellerlee.back.articlefavoritecount.domain.ArticleFavoriteCountRepository;

@Service
public class ArticleFavoriteCountService {
    private final ArticleFavoriteCountRepository articleFavoriteCountRepository;

    public ArticleFavoriteCountService(
            ArticleFavoriteCountRepository articleFavoriteCountRepository) {
        this.articleFavoriteCountRepository = articleFavoriteCountRepository;
    }

    @Transactional
    public void increase(Article article) {
        Optional<ArticleFavoriteCount> articleFavoriteCount =
                articleFavoriteCountRepository.findByArticle(article);

        ifPresentOrElse(articleFavoriteCount,
                ArticleFavoriteCount::increase,
                () -> articleFavoriteCountRepository.save(new ArticleFavoriteCount(article, 1L)));
    }

    @Transactional
    public void remove(Article article) {
        Optional<ArticleFavoriteCount> articleFavoriteCount =
                articleFavoriteCountRepository.findByArticle(article);
        articleFavoriteCount.ifPresent(ArticleFavoriteCount::decrease);
    }
}
