/**
 * @author jnsorn
 */

package sellerlee.back.article.presentation;

import sellerlee.back.article.domain.Article;

public class ArticleResponse {
    private Long id;
    private String title;
    private Long price;
    private String contents;

    private ArticleResponse() {
    }

    public ArticleResponse(Long id, String title, Long price, String contents) {
        this.id = id;
        this.title = title;
        this.contents = contents;
    }

    public static ArticleResponse of(Article article) {
        return new ArticleResponse(article.getId(), article.getTitle(), article.getPrice(), article.getContents());
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

    public String getContents() {
        return contents;
    }

}
