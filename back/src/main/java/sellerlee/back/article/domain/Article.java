/**
 * @author jnsorn
 */

package sellerlee.back.article.domain;

import sellerlee.back.member.domain.Member;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Article {
    @Id
    @GeneratedValue
    private Long id;

    @NotBlank(message = "제목을 입력해 주세요.")
    private String title;

    @Size(min=0, message = "0원 이상의 금액을 입력해 주세요.")
    private Long price;

    @Enumerated(EnumType.STRING)
    private Category category;

    @NotNull(message = "내용은 null이 될 수 없습니다.")
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