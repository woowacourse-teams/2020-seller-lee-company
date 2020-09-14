package sellerlee.back.member.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = -201563914L;

    public static final QMember member = new QMember("member1");

    public final StringPath avatar = createString("avatar");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath kakaoAccessToken = createString("kakaoAccessToken");

    public final StringPath kakaoId = createString("kakaoId");

    public final StringPath kakaoRefreshToken = createString("kakaoRefreshToken");

    public final StringPath nickname = createString("nickname");

    public final NumberPath<Double> score = createNumber("score", Double.class);

    public final EnumPath<State> state = createEnum("state", State.class);

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

