/**
 * @author jnsorn
 */

package sellerlee.back.article.presentation;

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.Category;
import sellerlee.back.article.domain.Tags;

public class ArticleCreateRequest {
    private final String title;
    private final Long price;
    private final Category category;
    private final String contents;
    private final Tags tags;

    public ArticleCreateRequest(String title, Long price, Category category, String contents, String tags) {
        this.title = title;
        this.price = price;
        this.category = category;
        this.contents = contents;
        this.tags = Tags.of(tags);
    }

    public Article toArticle() {
        return new Article(title, price, category, contents, tags);
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
}