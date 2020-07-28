/**
 * @author jnsorn
 */

package sellerlee.back.article.domain;

import sellerlee.back.member.domain.Member;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
public class Article {
    @Id
    @GeneratedValue
    @Column(name = "article_id")
    private Long id;

    @NotBlank(message = "제목을 입력해 주세요.")
    private String title;

    @Min(value = 0, message = "0원 이상의 금액을 입력해 주세요.")
    private Long price;

    @Enumerated(EnumType.STRING)
    private Category category;

    @NotNull(message = "내용은 null이 될 수 없습니다.")
    @Lob
    private String contents;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", insertable = false, updatable = false)
    private Member author;

    @Embedded
    private Tags tags;

    protected Article() {
    }

    public Article(Long id, String title, Long price, Category category, String contents, Member author, Tags tags) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.category = category;
        this.contents = contents;
        this.author = author;
        this.tags = tags;
    }

    public Article(String title, Long price, Category category, String contents, Member author, Tags tags) {
        this(null, title, price, category, contents, author, tags);
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

    public Member getAuthor() {
        return author;
    }

    public Tags getTags() {
        return tags;
    }
}
