/**
 * @author jnsorn
 */

package sellerlee.back.article.application;

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.Category;
import sellerlee.back.article.domain.Tags;
import sellerlee.back.member.domain.Member;

public class ArticleCreateRequest {
    private final String title;
    private final Long price;
    private final String category;
    private final String contents;
    private final Long member;
    private final String tags;

    public ArticleCreateRequest(String title, Long price, String category, String contents, Long memberId, String tags) {
        this.title = title;
        this.price = price;
        this.category = category;
        this.contents = contents;
        this.member = memberId;
        this.tags = tags;
    }

    public Article toArticle() {
        return new Article(title, price, Category.fromName(category), contents, new Member(member), Tags.of(tags));
    }

    public String getTitle() {
        return title;
    }

    public Long getPrice() {
        return price;
    }

    public String getCategory() {
        return category;
    }

    public String getContents() {
        return contents;
    }

    public Long getMember() {
        return member;
    }

    public String getTags() {
        return tags;
    }
}
