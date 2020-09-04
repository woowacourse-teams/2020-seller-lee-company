package sellerlee.back.article.infra;

import static sellerlee.back.article.domain.QArticle.*;
import static sellerlee.back.articlefavoritecount.domain.QArticleFavoriteCount.*;
import static sellerlee.back.favorite.domain.QFavorite.*;

import java.util.List;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import com.querydsl.core.QueryResults;
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
        QueryResults<FeedResponse> result = queryFactory
                .select(new QFeedResponse(
                        article.id,
                        article.price,
                        articleFavoriteCount.favoriteCount,
                        ExpressionUtils.as(JPAExpressions.select()
                                .from(favorite)
                                .where(favorite.member.id.eq(loginMember.getId()),
                                        favorite.article.id.eq(article.id))
                                .exists(), "favoriteState")))
                .from(article)
                .leftJoin(favorite).on(article.id.eq(favorite.article.id))
                .leftJoin(articleFavoriteCount).on(article.id.eq(articleFavoriteCount.article.id))
                .where(article.id.lt(lastArticleId),
                        article.tradeState.eq(TradeState.ON_SALE))
                .orderBy(article.id.desc())
                .limit(size)
                .fetchResults();

        return new PageImpl<>(result.getResults(), PageRequest.of(0, size), result.getTotal()).getContent();
    }
}
