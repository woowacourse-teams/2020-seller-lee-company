package sellerlee.back.trade.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTrade is a Querydsl query type for Trade
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QTrade extends EntityPathBase<Trade> {

    private static final long serialVersionUID = 924195722L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTrade trade = new QTrade("trade");

    public final sellerlee.back.common.domain.QBaseTimeEntity _super = new sellerlee.back.common.domain.QBaseTimeEntity(this);

    public final sellerlee.back.article.domain.QArticle article;

    public final sellerlee.back.member.domain.QMember buyer;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public final sellerlee.back.member.domain.QMember seller;

    public QTrade(String variable) {
        this(Trade.class, forVariable(variable), INITS);
    }

    public QTrade(Path<? extends Trade> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTrade(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTrade(PathMetadata metadata, PathInits inits) {
        this(Trade.class, metadata, inits);
    }

    public QTrade(Class<? extends Trade> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.article = inits.isInitialized("article") ? new sellerlee.back.article.domain.QArticle(forProperty("article"), inits.get("article")) : null;
        this.buyer = inits.isInitialized("buyer") ? new sellerlee.back.member.domain.QMember(forProperty("buyer")) : null;
        this.seller = inits.isInitialized("seller") ? new sellerlee.back.member.domain.QMember(forProperty("seller")) : null;
    }

}

