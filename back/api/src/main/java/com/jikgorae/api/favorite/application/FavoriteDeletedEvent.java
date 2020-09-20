package com.jikgorae.api.favorite.application;

import org.springframework.context.ApplicationEvent;

import com.jikgorae.api.favorite.domain.Favorite;

public class FavoriteDeletedEvent extends ApplicationEvent {
    private final Favorite favorite;

    public FavoriteDeletedEvent(Object source) {
        super(source);
        favorite = (Favorite)source;
    }

    public Favorite getFavorite() {
        return favorite;
    }
}
