package sellerlee.back.articlefavoritecount.application;

import static org.springframework.data.util.Optionals.*;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import sellerlee.back.article.domain.Article;
import sellerlee.back.articlefavoritecount.domain.ArticleFavoriteCount;
import sellerlee.back.articlefavoritecount.domain.ArticleFavoriteCountFactory;
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
        Optional<ArticleFavoriteCount> persist = articleFavoriteCountRepository.findByArticle(
                article);

        ifPresentOrElse(
                persist,
                ArticleFavoriteCount::increase,
                () -> articleFavoriteCountRepository
                        .save(new ArticleFavoriteCountFactory(article).createFirstCount())
        );
    }

    @Transactional
    public void decrease(Article article) {
        Optional<ArticleFavoriteCount> persist = articleFavoriteCountRepository.findByArticle(
                article);
        persist.ifPresent(ArticleFavoriteCount::decrease);
    }
}
