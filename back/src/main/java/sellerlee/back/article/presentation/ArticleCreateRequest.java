/**
 * @author jnsorn
 */

package sellerlee.back.article.presentation;

import sellerlee.back.article.domain.Article;

public class ArticleCreateRequest {
    private String title;
    private Long price;
    private String contents;

    public ArticleCreateRequest(String title, Long price, String contents) {
        this.title = title;
        this.price = price;
        this.contents = contents;
    }

    public Article toArticle() {
        return new Article(title, price, contents);
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