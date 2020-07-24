/**
 * @author jnsorn
 */

package sellerlee.back.article.presentation;

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.Category;

public class ArticleCreateRequest {
    private final String title;
    private final Long price;
    private final Category category;
    private final String contents;

    public ArticleCreateRequest(String title, Long price, Category category, String contents) {
        this.title = title;
        this.price = price;
        this.category = category;
        this.contents = contents;
    }

    public Article toArticle() {
        return new Article(title, price, category, contents);
    }

    public String getTitle() {
        return title;
    }

    public Long getPrice() {
        return price;
    }

    public String getContents() {
        return contents;
    }
}