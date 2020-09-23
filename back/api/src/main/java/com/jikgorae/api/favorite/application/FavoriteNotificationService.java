package com.jikgorae.api.favorite.application;

import java.util.NoSuchElementException;

import org.springframework.context.ApplicationEvent;
import org.springframework.stereotype.Service;

import com.jikgorae.api.article.application.ArticleViewService;
import com.jikgorae.api.article.domain.Article;
import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.member.domain.MemberRepository;
import com.jikgorae.common.notification.domain.NotificationService;
import com.jikgorae.common.notification.domain.PushToken;

@Service
public class FavoriteNotificationService implements NotificationService {
    private static final String MESSAGE = "님이 회원님의 게시글을 찜했습니다.";

    private final ArticleViewService articleViewService;
    private final MemberRepository memberRepository;

    public FavoriteNotificationService(ArticleViewService articleViewService,
            MemberRepository memberRepository) {
        this.articleViewService = articleViewService;
        this.memberRepository = memberRepository;
    }

    @Override
    public String makeMessage(ApplicationEvent applicationEvent) {
        FavoriteCreatedEvent event = (FavoriteCreatedEvent)applicationEvent;
        Article article = articleViewService.show(event.getFavorite().getArticle().getId());
        String author = article.getAuthor().getNickname();
        return author + MESSAGE;
    }

    @Override
    public PushToken getToken(ApplicationEvent applicationEvent) {
        FavoriteCreatedEvent event = (FavoriteCreatedEvent)applicationEvent;
        Member member = memberRepository.findById(event.getFavorite().getMember().getId())
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 회원입니다."));
        return new PushToken(member.getPushToken());
    }
}
