/**
 * @author jnsorn
 */

package sellerlee.back.article.domain;

import static java.util.Collections.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;

@Embeddable
public class Tags {
    @ElementCollection
    @CollectionTable(name = "tag", joinColumns = @JoinColumn(name = "article_id"))
    private List<Tag> tags;

    protected Tags() {
    }

    public Tags(List<Tag> tags) {
        this.tags = new ArrayList<>(tags);
    }

    public List<Tag> getTags() {
        return unmodifiableList(tags);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Tags that = (Tags)o;
        return Objects.equals(tags, that.tags);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tags);
    }
}
