package sellerlee.back.article.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPhotos is a Querydsl query type for Photos
 */
@Generated("com.querydsl.codegen.EmbeddableSerializer")
public class QPhotos extends BeanPath<Photos> {

    private static final long serialVersionUID = 621476013L;

    public static final QPhotos photos1 = new QPhotos("photos1");

    public final ListPath<String, StringPath> photos = this.<String, StringPath>createList("photos", String.class, StringPath.class, PathInits.DIRECT2);

    public QPhotos(String variable) {
        super(Photos.class, forVariable(variable));
    }

    public QPhotos(Path<? extends Photos> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPhotos(PathMetadata metadata) {
        super(Photos.class, metadata);
    }

}

