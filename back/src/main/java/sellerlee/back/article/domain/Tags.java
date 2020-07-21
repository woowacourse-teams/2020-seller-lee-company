package sellerlee.back.article.domain;

import javax.persistence.*;
import java.util.List;

@Embeddable
public class Tags {
    @ElementCollection
    @CollectionTable(name = "TAGS", joinColumns = @JoinColumn(name = "ARTICLE_ID"))
    @Column(name = "TAG")
    private List<Tag> tags;

    public Tags() {
    }
}
