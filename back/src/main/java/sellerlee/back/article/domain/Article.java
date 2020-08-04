/**
 * @author jnsorn
 */

package sellerlee.back.article.domain;

import sellerlee.back.member.domain.Member;

import javax.persistence.*;
import java.util.List;

@Entity
public class Article {
    @Id
    @GeneratedValue
    @Column(name = "article_id")
    private Long id;

    private String title;

    private Long price;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Lob
    private String contents;

    @Embedded
    private Tags tags;

    @ElementCollection
    @CollectionTable(name = "photo", joinColumns = @JoinColumn(name = "article_id"))
    private List<String> photos;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member author;

    protected Article() {
    }

    public Article(Long id, String title, Long price, Category category, String contents,
            Tags tags, List<String> photos, Member author) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.category = category;
        this.contents = contents;
        this.tags = tags;
        this.photos = photos;
        this.author = author;
    }

    public Article(String title, Long price, Category category, String contents,
            Tags tags, List<String> photos, Member author) {
        this(null, title, price, category, contents, tags, photos, author);
    }

    public Article(Long id) {
        this(id, null, null, null, null, null, null, null);
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

    public Tags getTags() {
        return tags;
    }

    public Member getAuthor() {
        return author;
    }
}
