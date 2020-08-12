package sellerlee.back.favorite.domain;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import sellerlee.back.favorite.application.ArticleFavoriteCountService;
import sellerlee.back.favorite.application.FavoriteCreatedEvent;

@Component
public class FavoriteListener implements ApplicationListener<FavoriteCreatedEvent> {
    private final ArticleFavoriteCountService articleFavoriteCountService;

    public FavoriteListener(ArticleFavoriteCountService articleFavoriteCountService) {
        this.articleFavoriteCountService = articleFavoriteCountService;
    }

    @Override
    public void onApplicationEvent(FavoriteCreatedEvent event) {
        articleFavoriteCountService.increase(event.getFavorite().getArticle());
    }
}
