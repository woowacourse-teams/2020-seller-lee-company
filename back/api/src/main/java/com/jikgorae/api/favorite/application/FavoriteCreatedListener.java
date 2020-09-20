package com.jikgorae.api.favorite.application;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.jikgorae.api.articlefavoritecount.application.ArticleFavoriteCountService;

@Component
public class FavoriteCreatedListener
        implements ApplicationListener<FavoriteCreatedEvent> {
    private final ArticleFavoriteCountService articleFavoriteCountService;

    public FavoriteCreatedListener(ArticleFavoriteCountService articleFavoriteCountService) {
        this.articleFavoriteCountService = articleFavoriteCountService;
    }

    @Override
    public void onApplicationEvent(FavoriteCreatedEvent event) {
        articleFavoriteCountService.increase(event.getFavorite().getArticle());
    }
}
