package sellerlee.back.article.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QArticle is a Querydsl query type for Article
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QArticle extends EntityPathBase<Article> {

    private static final long serialVersionUID = 1948803658L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QArticle article = new QArticle("article");

    public final sellerlee.back.common.domain.QBaseTimeEntity _super = new sellerlee.back.common.domain.QBaseTimeEntity(this);

    public final sellerlee.back.member.domain.QMember author;

    public final EnumPath<Category> category = createEnum("category", Category.class);

    public final StringPath contents = createString("contents");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public final QPhotos photos;

    public final NumberPath<Long> price = createNumber("price", Long.class);

    public final QTags tags;

    public final StringPath title = createString("title");

    public final EnumPath<TradeState> tradeState = createEnum("tradeState", TradeState.class);

    public QArticle(String variable) {
        this(Article.class, forVariable(variable), INITS);
    }

    public QArticle(Path<? extends Article> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QArticle(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QArticle(PathMetadata metadata, PathInits inits) {
        this(Article.class, metadata, inits);
    }

    public QArticle(Class<? extends Article> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.author = inits.isInitialized("author") ? new sellerlee.back.member.domain.QMember(forProperty("author")) : null;
        this.photos = inits.isInitialized("photos") ? new QPhotos(forProperty("photos")) : null;
        this.tags = inits.isInitialized("tags") ? new QTags(forProperty("tags")) : null;
    }

}

