/**
 * @author jnsorn
 */

package sellerlee.back.article.application;

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.Category;
import sellerlee.back.article.domain.Tags;
import sellerlee.back.member.domain.Member;

public class ArticleCreateRequest {
    private String title;
    private Long price;
    private String category;
    private String contents;
    private Long authorId;
    private String tags;

    private ArticleCreateRequest() {
    }

    public ArticleCreateRequest(String title, Long price, String category, String contents,
            Long authorId, String tags) {
        this.title = title;
        this.price = price;
        this.category = category;
        this.contents = contents;
        this.authorId = authorId;
        this.tags = tags;
    }

    public Article toArticle() {
        return new Article(title, price, Category.fromName(category), contents,
                Tags.of(tags), new Member(authorId, "sellerlee@gmail.com", "0000", 4.5));
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

    public Long getAuthorId() {
        return authorId;
    }

    public String getTags() {
        return tags;
    }
}
