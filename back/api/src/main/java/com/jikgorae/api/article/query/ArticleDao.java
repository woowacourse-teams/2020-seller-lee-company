package com.jikgorae.api.article.query;

import static com.jikgorae.api.article.domain.QArticle.*;
import static com.jikgorae.api.articlefavoritecount.domain.QArticleFavoriteCount.*;
import static com.jikgorae.api.favorite.domain.QFavorite.*;

import java.util.List;

import org.springframework.stereotype.Component;

import com.jikgorae.api.article.application.FeedResponse;
import com.jikgorae.api.article.application.QFeedResponse;
import com.jikgorae.api.article.domain.TradeState;
import com.jikgorae.api.member.domain.Member;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Component
public class ArticleDao {
    private final JPAQueryFactory queryFactory;

    public ArticleDao(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    public List<FeedResponse> showPage(Long lastArticleId, int size, Member loginMember) {
        return queryFactory
                .select(new QFeedResponse(
                        article,
                        articleFavoriteCount.favoriteCount,
                        ExpressionUtils.as(JPAExpressions.selectFrom(favorite)
                                .where(favorite.member.id.eq(loginMember.getId()),
                                        favorite.article.id.eq(article.id))
                                .exists(), "favoriteState")))
                .distinct()
                .from(article)
                .leftJoin(articleFavoriteCount).on(article.id.eq(articleFavoriteCount.article.id))
                .where(article.id.lt(lastArticleId), article.tradeState.eq(TradeState.ON_SALE))
                .orderBy(article.id.desc())
                .limit(size)
                .fetch();
    }
}
