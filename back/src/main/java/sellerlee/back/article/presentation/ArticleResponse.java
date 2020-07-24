/**
 * @author jnsorn
 */

package sellerlee.back.article.presentation;

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.Category;

public class ArticleResponse {
    private Long id;
    private String title;
    private Long price;
    private Category category;
    private String contents;

    private ArticleResponse() {
    }

    public ArticleResponse(Long id, String title, Long price, Category category, String contents) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.category = category;
        this.contents = contents;
    }

    public static ArticleResponse of(Article article) {
        return new ArticleResponse(article.getId(), article.getTitle(), article.getPrice(), article.getCategory(), article.getContents());
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
}