/**
 * @author kouz95
 */

package sellerlee.back.article.domain;

import sellerlee.back.member.domain.Member;

import javax.persistence.*;

@Entity
public class Article {
    @Id
    @GeneratedValue
    @Column(name = "ARTICLE_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID", insertable = false, updatable = false)
    private Member author;

    @Column
    private String title;

    @Column
    @Lob
    private String contents;

    @Column
    @Embedded
    private Tags tags;

    protected Article() {
    }

    public Article(Member author, String title, String contents,
            Tags tags) {
        this.author = author;
        this.title = title;
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

    public String getContents() {
        return contents;
    }

    public Tags getTags() {
        return tags;
    }
}
