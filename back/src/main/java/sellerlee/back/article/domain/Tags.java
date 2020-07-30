/**
 * @author jnsorn
 */

package sellerlee.back.article.domain;

import static java.util.Collections.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;

@Embeddable
public class Tags {
    public static final String HASHTAG = "#";

    @ElementCollection
    @CollectionTable(name = "tag", joinColumns = @JoinColumn(name = "article_id"))
    private List<Tag> tags;

    protected Tags() {
    }

    public Tags(List<Tag> tags) {
        this.tags = new ArrayList<>(tags);
    }

    public static Tags of(String rawTags) {
        List<Tag> tagNames = Arrays.stream(rawTags.split(HASHTAG))
                .map(String::trim)
                .filter(v -> !v.isEmpty())
                .map(Tag::new)
                .collect(Collectors.toList());
        return new Tags(tagNames);
    }

    public List<Tag> toList() {
        return unmodifiableList(tags);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Tags tags1 = (Tags)o;
        return Objects.equals(tags, tags1.tags);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tags);
    }
}
