package sellerlee.back.article.domain;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Article {
    @Id
    private Long id;

    public Article() {
    }

    public Long getId() {
        return id;
    }
}
