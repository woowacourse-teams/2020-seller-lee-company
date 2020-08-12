/**
 * @author kouz95
 */

package sellerlee.back.favorite.domain;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import sellerlee.back.favorite.application.ArticleFavoriteCountService;
import sellerlee.back.favorite.application.FavoriteCanceledEvent;

@Component
public class FavoriteCanceledListener implements ApplicationListener<FavoriteCanceledEvent> {
    private final ArticleFavoriteCountService articleFavoriteCountService;

    public FavoriteCanceledListener(ArticleFavoriteCountService articleFavoriteCountService) {
        this.articleFavoriteCountService = articleFavoriteCountService;
    }

    @Override
    public void onApplicationEvent(FavoriteCanceledEvent event) {
        articleFavoriteCountService.cancel(event.getFavorite().getArticle());
    }
}
