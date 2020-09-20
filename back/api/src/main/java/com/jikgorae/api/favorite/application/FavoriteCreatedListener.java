package com.jikgorae.api.favorite.application;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.jikgorae.api.articlefavoritecount.application.ArticleFavoriteCountService;

@Component
public class FavoriteCreatedListener
        implements ApplicationListener<FavoriteCreatedEvent> {
    private final ArticleFavoriteCountService articleFavoriteCountService;
    private final FavoriteNotificationService favoriteNotificationService;

    public FavoriteCreatedListener(ArticleFavoriteCountService articleFavoriteCountService,
            FavoriteNotificationService favoriteNotificationService) {
        this.articleFavoriteCountService = articleFavoriteCountService;
        this.favoriteNotificationService = favoriteNotificationService;
    }

    @Override
    public void onApplicationEvent(FavoriteCreatedEvent event) {
        articleFavoriteCountService.increase(event.getFavorite().getArticle());
        favoriteNotificationService.send(event);
    }
}
