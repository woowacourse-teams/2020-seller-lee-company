/**
 * @author kouz95
 */

package sellerlee.back.articlefavoritecount.infra;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import sellerlee.back.articlefavoritecount.application.ArticleFavoriteCountService;
import sellerlee.back.favorite.application.FavoriteRemovedEvent;

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
