package com.jikgorae.api.favorite.infra;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.jikgorae.api.articlefavoritecount.application.ArticleFavoriteCountService;
import com.jikgorae.api.favorite.application.FavoriteRemovedEvent;

@Component
public class FavoriteRemovedListener implements ApplicationListener<FavoriteRemovedEvent> {
    private final ArticleFavoriteCountService articleFavoriteCountService;

    public FavoriteRemovedListener(ArticleFavoriteCountService articleFavoriteCountService) {
        this.articleFavoriteCountService = articleFavoriteCountService;
    }

    @Override
    public void onApplicationEvent(FavoriteRemovedEvent event) {
        articleFavoriteCountService.decrease(event.getFavorite().getArticle());
    }
}
