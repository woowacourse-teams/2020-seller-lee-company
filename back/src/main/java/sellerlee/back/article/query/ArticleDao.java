package sellerlee.back.article.query;

import static sellerlee.back.article.domain.QArticle.*;
import static sellerlee.back.articlefavoritecount.domain.QArticleFavoriteCount.*;
import static sellerlee.back.favorite.domain.QFavorite.*;

import java.util.List;

import org.springframework.stereotype.Component;

import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import sellerlee.back.article.application.FeedResponse;
import sellerlee.back.article.application.QFeedResponse;
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
