package com.jikgorae.api.articlefavoritecount.application;

import static org.springframework.data.util.Optionals.*;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.jikgorae.api.article.domain.Article;
import com.jikgorae.api.articlefavoritecount.domain.ArticleFavoriteCount;
import com.jikgorae.api.articlefavoritecount.domain.ArticleFavoriteCountFactory;
import com.jikgorae.api.articlefavoritecount.domain.ArticleFavoriteCountRepository;

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
