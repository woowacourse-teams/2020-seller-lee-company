/**
 * @author kouz95
 */

package sellerlee.back.favorite.application;

import org.springframework.context.ApplicationEvent;

import sellerlee.back.favorite.domain.Favorite;

public class FavoriteCanceledEvent extends ApplicationEvent {
    private final Favorite favorite;

    public FavoriteCanceledEvent(Object source) {
        super(source);
        favorite = (Favorite)source;
    }

    public Favorite getFavorite() {
        return favorite;
    }
}
