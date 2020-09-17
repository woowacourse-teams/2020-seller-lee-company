package com.jikgorae.api.favorite.application;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.jikgorae.api.articlefavoritecount.application.ArticleFavoriteCountService;

@Component
public class FavoriteCountDecreaseListener implements ApplicationListener<FavoriteCountDecreaseEvent> {
    private final ArticleFavoriteCountService articleFavoriteCountService;

    public FavoriteCountDecreaseListener(ArticleFavoriteCountService articleFavoriteCountService) {
        this.articleFavoriteCountService = articleFavoriteCountService;
    }

    @Override
    public void onApplicationEvent(FavoriteCountDecreaseEvent event) {
        articleFavoriteCountService.decrease(event.getFavorite().getArticle());
    }
}
