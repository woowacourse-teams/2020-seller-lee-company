package com.jikgorae.api.favorite.application;

import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.jikgorae.api.article.application.ArticleViewService;
import com.jikgorae.api.article.domain.Article;
import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.member.domain.MemberRepository;
import com.jikgorae.common.notification.domain.NotificationService;
import com.jikgorae.common.notification.domain.PushToken;
import com.jikgorae.common.notification.infra.NotificationSupport;

@Service
public class FavoriteNotificationService implements NotificationService {
    private static final String MESSAGE = "님이 회원님의 게시글을 찜했습니다.";

    private final ArticleViewService articleViewService;
    private final MemberRepository memberRepository;
    private final NotificationSupport notificationSupport;

    public FavoriteNotificationService(ArticleViewService articleViewService,
            MemberRepository memberRepository,
            NotificationSupport notificationSupport) {
        this.articleViewService = articleViewService;
        this.memberRepository = memberRepository;
        this.notificationSupport = notificationSupport;
    }

    @Override
    public String makeMessage(Long articleId) {
        Article article = articleViewService.show(articleId);
        String author = article.getAuthor().getNickname();
        return author + MESSAGE;
    }

    @Override
    public PushToken getToken(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 회원입니다."));
        return new PushToken(member.getPushToken());
    }

    public void send(FavoriteCreatedEvent event) {
        String message = makeMessage(event.getFavorite().getArticle().getId());
        PushToken pushToken = getToken(event.getFavorite().getMember().getId());
        notificationSupport.send(pushToken, message);
    }
}
