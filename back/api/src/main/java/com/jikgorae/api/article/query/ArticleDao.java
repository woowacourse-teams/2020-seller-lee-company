package com.jikgorae.api.article.query;

import static com.jikgorae.api.article.domain.QArticle.*;
import static com.jikgorae.api.articlefavoritecount.domain.QArticleFavoriteCount.*;
import static com.jikgorae.api.articleorganization.domain.QArticleOrganization.*;
import static com.jikgorae.api.favorite.domain.QFavorite.*;
import static com.jikgorae.api.memberOrganization.domain.QMemberOrganization.*;

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
                .selectDistinct(new QFeedResponse(
                        article,
                        articleFavoriteCount.favoriteCount,
                        ExpressionUtils.as(JPAExpressions.selectFrom(favorite)
                                .where(favorite.member.eq(loginMember),
                                        favorite.article.eq(article))
                                .exists(), "favoriteState")))
                .from(article)
                .leftJoin(articleFavoriteCount).on(article.eq(articleFavoriteCount.article))
                .join(articleOrganization).on(article.eqAny(
                        JPAExpressions
                                .select(articleOrganization.article)
                                .from(articleOrganization)
                                .join(memberOrganization).on(
                                articleOrganization.organization.eqAny(
                                        JPAExpressions
                                                .select(memberOrganization.organization)
                                                .from(memberOrganization)
                                                .where(memberOrganization.member.eq(
                                                        loginMember))))
                ))
                .where(article.id.lt(lastArticleId),
                        article.tradeState.eq(TradeState.ON_SALE))
                .orderBy(article.createdTime.desc())
                .limit(size)
                .fetch();
    }

    public List<FeedResponse> showPageByOrganization(Long lastArticleId, int size,
            Long organizationId,
            Member loginMember) {
        return queryFactory
                .selectDistinct(new QFeedResponse(
                        article,
                        articleFavoriteCount.favoriteCount,
                        ExpressionUtils.as(JPAExpressions.selectFrom(favorite)
                                .where(favorite.member.eq(loginMember),
                                        favorite.article.eq(article))
                                .exists(), "favoriteState")))
                .from(article)
                .leftJoin(articleFavoriteCount).on(article.eq(articleFavoriteCount.article))
                .join(articleOrganization).on(article.id.eqAny(
                        JPAExpressions
                                .select(articleOrganization.article.id)
                                .from(articleOrganization)
                                .where(articleOrganization.organization.id.eq(organizationId))))
                .where(article.id.lt(lastArticleId),
                        article.tradeState.eq(TradeState.ON_SALE))
                .orderBy(article.createdTime.desc())
                .limit(size)
                .fetch();
    }
}
