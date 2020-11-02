package com.jikgorae.api.favorite.query;

import static com.jikgorae.api.article.domain.QArticle.*;
import static com.jikgorae.api.articlefavoritecount.domain.QArticleFavoriteCount.*;
import static com.jikgorae.api.favorite.domain.QFavorite.*;

import java.util.List;

import org.springframework.stereotype.Component;

import com.jikgorae.api.article.application.ArticleCardResponse;
import com.jikgorae.api.article.application.QArticleCardResponse;
import com.jikgorae.api.member.domain.Member;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Component
public class FavoriteDao {
    private final JPAQueryFactory queryFactory;

    public FavoriteDao(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    public List<ArticleCardResponse> showFavorites(Member loginMember) {
        return queryFactory
                .selectDistinct(new QArticleCardResponse(
                        article,
                        articleFavoriteCount.favoriteCount,
                        getFavoriteState(loginMember)))
                .from(favorite)
                .leftJoin(article).on(favorite.article.eq(article))
                .leftJoin(articleFavoriteCount).on(favorite.article.eq(articleFavoriteCount.article))
                .where(favorite.member.id.eq(loginMember.getId()))
                .orderBy(article.createdTime.desc())
                .fetch();
    }

    private Expression<Boolean> getFavoriteState(Member loginMember) {
        return ExpressionUtils.as(JPAExpressions.selectFrom(favorite)
                .where(favorite.member.eq(loginMember),
                        favorite.article.eq(article))
                .exists(), "favoriteState");
    }
}
