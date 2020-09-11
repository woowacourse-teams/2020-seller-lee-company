package sellerlee.back.evaluation.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QScore is a Querydsl query type for Score
 */
@Generated("com.querydsl.codegen.EmbeddableSerializer")
public class QScore extends BeanPath<Score> {

    private static final long serialVersionUID = 916236884L;

    public static final QScore score1 = new QScore("score1");

    public final NumberPath<Integer> questionId = createNumber("questionId", Integer.class);

    public final NumberPath<Integer> score = createNumber("score", Integer.class);

    public QScore(String variable) {
        super(Score.class, forVariable(variable));
    }

    public QScore(Path<? extends Score> path) {
        super(path.getType(), path.getMetadata());
    }

    public QScore(PathMetadata metadata) {
        super(Score.class, metadata);
    }

}

