package sellerlee.back.articlefavoritecount.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QArticleFavoriteCount is a Querydsl query type for ArticleFavoriteCount
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QArticleFavoriteCount extends EntityPathBase<ArticleFavoriteCount> {

    private static final long serialVersionUID = -959130372L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QArticleFavoriteCount articleFavoriteCount = new QArticleFavoriteCount("articleFavoriteCount");

    public final sellerlee.back.article.domain.QArticle article;

    public final NumberPath<Long> favoriteCount = createNumber("favoriteCount", Long.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public QArticleFavoriteCount(String variable) {
        this(ArticleFavoriteCount.class, forVariable(variable), INITS);
    }

    public QArticleFavoriteCount(Path<? extends ArticleFavoriteCount> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QArticleFavoriteCount(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QArticleFavoriteCount(PathMetadata metadata, PathInits inits) {
        this(ArticleFavoriteCount.class, metadata, inits);
    }

    public QArticleFavoriteCount(Class<? extends ArticleFavoriteCount> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.article = inits.isInitialized("article") ? new sellerlee.back.article.domain.QArticle(forProperty("article"), inits.get("article")) : null;
    }

}

