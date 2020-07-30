/**
 * @author jnsorn
 */

package sellerlee.back.article.domain;

import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import sellerlee.back.member.domain.Member;

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
    @CollectionTable(name = "image", joinColumns = @JoinColumn(name = "article_id"))
    private List<String> images;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member author;

    protected Article() {
    }

    public Article(Long id, String title, Long price, Category category, String contents,
            Tags tags, List<String> images, Member author) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.category = category;
        this.contents = contents;
        this.tags = tags;
        this.images = images;
        this.author = author;
    }

    public Article(String title, Long price, Category category, String contents,
            Tags tags, List<String> images, Member author) {
        this(null, title, price, category, contents, tags, images, author);
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

    public List<String> getImages() {
        return images;
    }

    public Member getAuthor() {
        return author;
    }
}
