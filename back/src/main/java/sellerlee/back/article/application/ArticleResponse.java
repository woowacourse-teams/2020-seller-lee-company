/**
 * @author kouz95
 */

package sellerlee.back.article.application;

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.Category;
import sellerlee.back.article.domain.Tag;

import java.util.List;

import static java.util.stream.Collectors.toList;

public class ArticleResponse {
    private Long id;
    private String title;
    private Category category;
    private Long price;
    private String contents;
    private List<Tag> tags;

    private ArticleResponse() {
    }

    public ArticleResponse(Long id, String title, Category category, Long price, String contents,
            List<Tag> tags) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.price = price;
        this.contents = contents;
        this.tags = tags;
    }

    public static ArticleResponse of(Article article) {
        return new ArticleResponse(article.getId(),
                article.getTitle(),
                article.getCategory(),
                article.getPrice(),
                article.getContents(),
                article.getTags().toList());
    }

    public static List<ArticleResponse> listOf(List<Article> articles) {
        return articles.stream()
                .map(ArticleResponse::of)
                .collect(toList());
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Category getCategory() {
        return category;
    }

    public Long getPrice() {
        return price;
    }

    public String getContents() {
        return contents;
    }

    public List<Tag> getTags() {
        return tags;
    }
}
