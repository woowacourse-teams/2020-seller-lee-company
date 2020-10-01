package com.jikgorae.api.favorite.application;

import org.springframework.context.ApplicationEvent;
import org.springframework.stereotype.Service;

import com.jikgorae.api.article.application.ArticleViewService;
import com.jikgorae.api.article.domain.Article;
import com.jikgorae.common.notification.domain.NotificationService;
import com.jikgorae.common.notification.domain.PushToken;

@Service
public class FavoriteNotificationService implements NotificationService {
    private static final String MESSAGE = "님이 회원님의 게시글을 찜했습니다.";

    private final ArticleViewService articleViewService;

    public FavoriteNotificationService(ArticleViewService articleViewService) {
        this.articleViewService = articleViewService;
    }

    @Override
    public String makeMessage(ApplicationEvent applicationEvent) {
        FavoriteCreatedEvent event = (FavoriteCreatedEvent)applicationEvent;
        String senderNickname = event.getFavorite().getMember().getNickname();
        return senderNickname + MESSAGE;
    }

    @Override
    public PushToken getToken(ApplicationEvent applicationEvent) {
        FavoriteCreatedEvent event = (FavoriteCreatedEvent)applicationEvent;
        Article article = articleViewService.show(event.getFavorite().getArticle().getId());
        return new PushToken(article.getAuthor().getPushToken());
    }
}
