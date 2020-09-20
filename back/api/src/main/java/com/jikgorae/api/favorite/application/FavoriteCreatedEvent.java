package com.jikgorae.api.favorite.application;

import org.springframework.context.ApplicationEvent;

import com.jikgorae.api.favorite.domain.Favorite;

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
