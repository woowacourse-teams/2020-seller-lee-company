package com.jikgorae.api.article.query;

import static com.jikgorae.api.article.domain.QArticle.*;
import static com.jikgorae.api.articlefavoritecount.domain.QArticleFavoriteCount.*;
import static com.jikgorae.api.articleorganization.domain.QArticleOrganization.*;
import static com.jikgorae.api.favorite.domain.QFavorite.*;
import static com.jikgorae.api.memberOrganization.domain.QMemberOrganization.*;

import java.util.List;

import org.springframework.stereotype.Component;

import com.jikgorae.api.article.application.ArticleCardResponse;
import com.jikgorae.api.article.application.FeedResponse;
import com.jikgorae.api.article.application.QArticleCardResponse;
import com.jikgorae.api.article.application.QFeedResponse;
import com.jikgorae.api.article.domain.Category;
import com.jikgorae.api.article.domain.TradeState;
import com.jikgorae.api.member.domain.Member;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Component
public class ArticleDao {
    public static final String FAVORITE_STATE = "favoriteState";

    private final JPAQueryFactory queryFactory;

    public ArticleDao(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    public List<FeedResponse> showPage(Long lastArticleId, int size, Member loginMember,
            Long organizationId) {
        return queryFactory
                .selectDistinct(new QFeedResponse(
                        article,
                        articleFavoriteCount.favoriteCount,
                        getFavoriteState(loginMember)))
                .from(article)
                .join(articleOrganization).on(equalAnyArticle(loginMember, organizationId))
                .leftJoin(articleFavoriteCount).on(equalArticle())
                .where(lessThanArticleId(lastArticleId), isOnSale())
                .orderBy(article.createdTime.desc())
                .limit(size)
                .fetch();
    }

    public List<ArticleCardResponse> showPageByCategory(Long lastArticleId, int size,
            String category, Member loginMember, Long organizationId) {
        return queryFactory
                .selectDistinct(new QArticleCardResponse(
                        article,
                        articleFavoriteCount.favoriteCount,
                        getFavoriteState(loginMember)))
                .from(article)
                .join(articleOrganization).on(equalAnyArticle(loginMember, organizationId))
                .leftJoin(articleFavoriteCount).on(equalArticle())
                .where(lessThanArticleId(lastArticleId), isOnSale(), equalCategory(category))
                .orderBy(article.createdTime.desc())
                .limit(size)
                .fetch();
    }

    private BooleanExpression equalArticle() {
        return article.eq(articleFavoriteCount.article);
    }

    private BooleanExpression lessThanArticleId(Long lastArticleId) {
        return article.id.lt(lastArticleId);
    }

    private Expression<Boolean> getFavoriteState(Member loginMember) {
        return ExpressionUtils.as(JPAExpressions.selectFrom(favorite)
                .where(favorite.member.eq(loginMember),
                        favorite.article.eq(article))
                .exists(), FAVORITE_STATE);
    }

    private BooleanExpression equalAnyArticle(Member loginMember, Long organizationId) {
        return article.eqAny(
                JPAExpressions
                        .select(articleOrganization.article)
                        .from(articleOrganization)
                        .where(equalOrganization(organizationId, loginMember)));
    }

    private Predicate equalOrganization(Long organizationId,
            Member loginMember) {
        if (organizationId == null) {
            return articleOrganization.organization.eqAny(
                    JPAExpressions
                            .select(memberOrganization.organization)
                            .from(memberOrganization)
                            .where(memberOrganization.member.eq(
                                    loginMember)));
        }
        return articleOrganization.organization.id.eq(organizationId);
    }

    private BooleanExpression isOnSale() {
        return article.tradeState.ne(TradeState.COMPLETED);
    }

    private BooleanExpression equalCategory(String category) {
        return article.category.eq(Category.fromString(category));
    }
}

