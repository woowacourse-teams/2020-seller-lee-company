package com.jikgorae.api.chatroom.query;

import static com.jikgorae.api.article.domain.QArticle.*;
import static com.jikgorae.api.chatroom.domain.QChatRoom.*;
import static com.jikgorae.api.member.domain.QMember.*;

import java.util.List;

import org.springframework.stereotype.Component;

import com.jikgorae.api.member.domain.Member;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Component
public class ChatRoomDao {
    private final JPAQueryFactory queryFactory;

    public ChatRoomDao(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    public List<ChatRoomInfo> showAll(Member loginMember) {
        return queryFactory.select(new QChatRoomInfo(
                chatRoom.id,
                ExpressionUtils.as(JPAExpressions.selectFrom(article)
                        .where(article.id.eq(chatRoom.article.id)), "article"),
                chatRoom.buyer,
                ExpressionUtils.as(JPAExpressions.selectFrom(member)
                        .where(member.id.eq(chatRoom.sellerId)), "seller")))
                .distinct()
                .from(chatRoom)
                .where(chatRoom.buyer.id.eq(loginMember.getId())
                        .or(chatRoom.sellerId.eq(loginMember.getId())))
                .fetch();
    }
}
