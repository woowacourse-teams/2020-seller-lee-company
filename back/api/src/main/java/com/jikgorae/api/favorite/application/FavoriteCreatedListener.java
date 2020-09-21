package com.jikgorae.api.favorite.application;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.jikgorae.api.articlefavoritecount.application.ArticleFavoriteCountService;
import com.jikgorae.common.notification.domain.PushToken;
import com.jikgorae.common.notification.infra.NotificationSupport;

@Component
public class FavoriteCreatedListener
        implements ApplicationListener<FavoriteCreatedEvent> {
    private final ArticleFavoriteCountService articleFavoriteCountService;
    private final FavoriteNotificationService favoriteNotificationService;
    private final NotificationSupport notificationSupport;

    public FavoriteCreatedListener(ArticleFavoriteCountService articleFavoriteCountService,
            FavoriteNotificationService favoriteNotificationService,
            NotificationSupport notificationSupport) {
        this.articleFavoriteCountService = articleFavoriteCountService;
        this.favoriteNotificationService = favoriteNotificationService;
        this.notificationSupport = notificationSupport;
    }

    @Override
    public void onApplicationEvent(FavoriteCreatedEvent event) {
        articleFavoriteCountService.increase(event.getFavorite().getArticle());
        sendNotification(event);
    }

    private void sendNotification(FavoriteCreatedEvent event) {
        String message = favoriteNotificationService.makeMessage(event);
        PushToken pushToken = favoriteNotificationService.getToken(event);
        notificationSupport.send(pushToken, message);
    }
}
