package sellerlee.back.articlefavoritecount.infra;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import sellerlee.back.articlefavoritecount.application.ArticleFavoriteCountService;
import sellerlee.back.favorite.application.FavoriteCreatedEvent;

@Component
public class FavoriteCreatedListener implements ApplicationListener<FavoriteCreatedEvent> {
    private final ArticleFavoriteCountService articleFavoriteCountService;

    public FavoriteCreatedListener(ArticleFavoriteCountService articleFavoriteCountService) {
        this.articleFavoriteCountService = articleFavoriteCountService;
    }

    @Override
    public void onApplicationEvent(FavoriteCreatedEvent event) {
        articleFavoriteCountService.increase(event.getFavorite().getArticle());
    }
}
