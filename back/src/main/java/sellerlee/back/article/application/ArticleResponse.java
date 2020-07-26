/**
 * @author jnsorn
 */

package sellerlee.back.article.application;

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.Category;
import sellerlee.back.article.domain.Tags;
import sellerlee.back.member.domain.Member;

public class ArticleResponse {
    private Long id;
    private String title;
    private Long price;
    private Category category;
    private String contents;
    private Member member;
    private Tags tags;

    private ArticleResponse() {
    }

    public ArticleResponse(Long id, String title, Long price, Category category, String contents, Member member, Tags tags) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.category = category;
        this.contents = contents;
        this.member = member;
        this.tags = tags;
    }

    public static ArticleResponse of(Article article) {
        return new ArticleResponse(article.getId(), article.getTitle(), article.getPrice(), article.getCategory(),
                article.getContents(), article.getMember(), article.getTags());
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