/**
 * @author jnsorn
 */

package sellerlee.back.article.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Article {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private Long price;
    private String contents;

    public Article() {
    }

    public Article(Long id, String title, Long price, String contents) {
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContents() {
        return contents;
    }

    public Long getPrice() {
        return price;
    }
}
