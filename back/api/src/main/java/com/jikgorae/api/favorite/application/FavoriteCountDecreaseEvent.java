package com.jikgorae.api.favorite.application;

import org.springframework.context.ApplicationEvent;

import com.jikgorae.api.favorite.domain.Favorite;

public class FavoriteCountDecreaseEvent extends ApplicationEvent {
    private final Favorite favorite;

    public FavoriteCountDecreaseEvent(Object source) {
        super(source);
        favorite = (Favorite)source;
    }

    public Favorite getFavorite() {
        return favorite;
    }
}
