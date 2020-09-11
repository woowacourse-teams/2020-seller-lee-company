package sellerlee.back.evaluation.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QEvaluation is a Querydsl query type for Evaluation
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QEvaluation extends EntityPathBase<Evaluation> {

    private static final long serialVersionUID = 206152890L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QEvaluation evaluation = new QEvaluation("evaluation");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final ListPath<Score, QScore> scores = this.<Score, QScore>createList("scores", Score.class, QScore.class, PathInits.DIRECT2);

    public final sellerlee.back.member.domain.QMember target;

    public final sellerlee.back.trade.domain.QTrade trade;

    public QEvaluation(String variable) {
        this(Evaluation.class, forVariable(variable), INITS);
    }

    public QEvaluation(Path<? extends Evaluation> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QEvaluation(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QEvaluation(PathMetadata metadata, PathInits inits) {
        this(Evaluation.class, metadata, inits);
    }

    public QEvaluation(Class<? extends Evaluation> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.target = inits.isInitialized("target") ? new sellerlee.back.member.domain.QMember(forProperty("target")) : null;
        this.trade = inits.isInitialized("trade") ? new sellerlee.back.trade.domain.QTrade(forProperty("trade"), inits.get("trade")) : null;
    }

}

