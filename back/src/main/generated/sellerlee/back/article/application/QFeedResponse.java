package sellerlee.back.article.application;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.Generated;

/**
 * sellerlee.back.article.application.QFeedResponse is a Querydsl Projection type for FeedResponse
 */
@Generated("com.querydsl.codegen.ProjectionSerializer")
public class QFeedResponse extends ConstructorExpression<FeedResponse> {

    private static final long serialVersionUID = 1095363355L;

    public QFeedResponse(com.querydsl.core.types.Expression<? extends sellerlee.back.article.domain.Article> article, com.querydsl.core.types.Expression<Long> favoriteCount, com.querydsl.core.types.Expression<Boolean> favoriteState) {
        super(FeedResponse.class, new Class<?>[]{sellerlee.back.article.domain.Article.class, long.class, boolean.class}, article, favoriteCount, favoriteState);
    }

}

