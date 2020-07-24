/**
 * @author jnsorn
 */

package sellerlee.back.article.domain;

import javax.persistence.*;

@Entity
public class Article {
    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private Long price;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Lob
    private String contents;

    protected Article() {
    }

    public Article(String title, Long price, Category category, String contents) {
        this.title = title;
        this.price = price;
        this.category = category;
        this.contents = contents;
    }

    public Article(Long id, String title, Long price, Category category, String contents) {
        this(title,price,category,contents);
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Long getPrice() {
        return price;
    }

    public Category getCategory() {
        return category;
    }

    public String getContents() {
        return contents;
    }
}