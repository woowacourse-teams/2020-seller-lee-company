package sellerlee.back.favorite.application;

import org.springframework.context.ApplicationEvent;

import sellerlee.back.favorite.domain.Favorite;

public class FavoriteCreatedEvent extends ApplicationEvent {
    private final Favorite favorite;

    public FavoriteCreatedEvent(Object source) {
        super(source);
        favorite = (Favorite)source;
    }

    public Favorite getFavorite() {
        return favorite;
    }
}
