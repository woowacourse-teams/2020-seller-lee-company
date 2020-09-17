package com.jikgorae.api.favorite.application;

import org.springframework.context.ApplicationEvent;

import com.jikgorae.api.favorite.domain.Favorite;

public class FavoriteCountIncreaseEvent extends ApplicationEvent {
    private final Favorite favorite;

    public FavoriteCountIncreaseEvent(Object source) {
        super(source);
        favorite = (Favorite)source;
    }

    public Favorite getFavorite() {
        return favorite;
    }
}
