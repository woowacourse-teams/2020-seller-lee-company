package com.jikgorae.api.favorite.application;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.jikgorae.api.articlefavoritecount.application.ArticleFavoriteCountService;

@Component
public class FavoriteCountIncreaseListener implements ApplicationListener<FavoriteCountIncreaseEvent> {
    private final ArticleFavoriteCountService articleFavoriteCountService;

    public FavoriteCountIncreaseListener(ArticleFavoriteCountService articleFavoriteCountService) {
        this.articleFavoriteCountService = articleFavoriteCountService;
    }

    @Override
    public void onApplicationEvent(FavoriteCountIncreaseEvent event) {
        articleFavoriteCountService.increase(event.getFavorite().getArticle());
    }
}
