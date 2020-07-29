/**
 * @author kouz95
 */

package sellerlee.back.article.domain;

import javax.persistence.Column;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", insertable = false, updatable = false)
    private Member author;

    private String title;

    @Enumerated(EnumType.STRING)
    private Category category;

    private Long price;

    @Lob
    private String contents;

    @Embedded
    private Tags tags;

    protected Article() {
    }

    public Article(Member author, String title, Category category, Long price,
            String contents, Tags tags) {
        this.author = author;
        this.title = title;
        this.category = category;
        this.price = price;
        this.contents = contents;
        this.tags = tags;
    }

    public Long getId() {
        return id;
    }

    public Member getAuthor() {
        return author;
    }

    public String getTitle() {
        return title;
    }

    public Category getCategory() {
        return category;
    }

    public Long getPrice() {
        return price;
    }

    public String getContents() {
        return contents;
    }

    public Tags getTags() {
        return tags;
    }
}
