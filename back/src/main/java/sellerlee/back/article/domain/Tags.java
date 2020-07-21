/**
 * @author kouz95
 */

package sellerlee.back.article.domain;

import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import java.util.List;

@Embeddable
public class Tags {
    @ElementCollection
    @CollectionTable(name = "TAG", joinColumns = @JoinColumn(name = "ARTICLE_ID"))
    private List<Tag> tags;

    public Tags() {
    }
}
