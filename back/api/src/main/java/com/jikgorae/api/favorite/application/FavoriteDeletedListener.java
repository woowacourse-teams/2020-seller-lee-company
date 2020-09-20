package com.jikgorae.api.favorite.application;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.jikgorae.api.articlefavoritecount.application.ArticleFavoriteCountService;

@Component
public class FavoriteDeletedListener
        implements ApplicationListener<FavoriteDeletedEvent> {
    private final ArticleFavoriteCountService articleFavoriteCountService;

    public FavoriteDeletedListener(ArticleFavoriteCountService articleFavoriteCountService) {
        this.articleFavoriteCountService = articleFavoriteCountService;
    }

    @Override
    public void onApplicationEvent(FavoriteDeletedEvent event) {
        articleFavoriteCountService.decrease(event.getFavorite().getArticle());
    }
}
