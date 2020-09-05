package sellerlee.back.article.infra;

import static com.querydsl.core.group.GroupBy.*;
import static com.querydsl.core.types.dsl.Expressions.list;
import static sellerlee.back.article.domain.QArticle.*;
import static sellerlee.back.article.domain.QPhotos.*;
import static sellerlee.back.article.domain.QTag.*;
import static sellerlee.back.article.domain.QTags.*;
import static sellerlee.back.articlefavoritecount.domain.QArticleFavoriteCount.*;
import static sellerlee.back.favorite.domain.QFavorite.*;

import java.util.List;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import com.querydsl.core.QueryResults;
import com.querydsl.core.group.GroupBy;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.hibernate.HibernateQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import sellerlee.back.article.application.FeedResponse;
import sellerlee.back.article.domain.Photos;
import sellerlee.back.article.domain.QPhotos;
import sellerlee.back.article.domain.QTag;
import sellerlee.back.article.domain.QTags;
import sellerlee.back.article.domain.Tags;
import sellerlee.back.article.domain.TradeState;
import sellerlee.back.member.domain.Member;

@Component
public class ArticleDao {
    private final JPAQueryFactory queryFactory;

    public ArticleDao(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    public List<FeedResponse> showPage(Long lastArticleId, int size, Member loginMember) {
        return queryFactory
                .select()
                .from(article)
                .leftJoin(article.tags.tags)
                .leftJoin(article.photos.photos)
                .leftJoin(favorite).on(article.id.eq(favorite.article.id))
                .leftJoin(articleFavoriteCount).on(article.id.eq(articleFavoriteCount.article.id))
                .where(article.id.lt(lastArticleId),
                        article.tradeState.eq(TradeState.ON_SALE))
                .orderBy(article.id.desc())
                .limit(size)
                .transform(groupBy(article.id)
                .list(Projections.constructor(FeedResponse.class,
                        article.id,
                        article.price,
                        articleFavoriteCount.favoriteCount,
                        ExpressionUtils.as(JPAExpressions.select()
                                        .from(favorite)
                                        .where(favorite.member.id.eq(loginMember.getId()),
                                                favorite.article.id.eq(article.id))
                                        .exists()
                                , "favoriteState"),
                        list(article.tags),
                        list(article.photos))));
    }
}
