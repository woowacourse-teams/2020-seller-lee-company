/**
 * @author jnsorn
 */

package sellerlee.back.article.domain;

import sellerlee.back.member.domain.Member;

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

    @ManyToOne
    private Member member;

    @Embedded
    private Tags tags;

    protected Article() {
    }

    public Article(String title, Long price, Category category, String contents, Member member, Tags tags) {
        this.title = title;
        this.price = price;
        this.category = category;
        this.contents = contents;
        this.member = member;
        this.tags = tags;
    }

    public Article(Long id, String title, Long price, Category category, String contents, Member member, Tags tags) {
        this(title, price, category, contents, member, tags);
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

    public Member getMember() {
        return member;
    }

    public Tags getTags() {
        return tags;
    }
}