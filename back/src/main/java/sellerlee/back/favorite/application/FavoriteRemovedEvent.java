/**
 * @author kouz95
 */

package sellerlee.back.favorite.application;

import org.springframework.context.ApplicationEvent;

import sellerlee.back.favorite.domain.Favorite;

public class FavoriteRemovedEvent extends ApplicationEvent {
    private final Favorite favorite;

    public FavoriteRemovedEvent(Object source) {
        super(source);
        favorite = (Favorite)source;
    }

    public Favorite getFavorite() {
        return favorite;
    }
}
