package sellerlee.back.article.domain;

import java.util.Arrays;
import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;

@Embeddable
public class Photos {
    @ElementCollection
    @CollectionTable(name = "photo", joinColumns = @JoinColumn(name = "article_id"))
    private List<String> photos;

    protected Photos() {
    }

    public Photos(List<String> photos) {
        this.photos = photos;
    }

    public static Photos of(String... photos) {
        return new Photos(Arrays.asList(photos));
    }

    public List<String> getPhotos() {
        return photos;
    }
}
