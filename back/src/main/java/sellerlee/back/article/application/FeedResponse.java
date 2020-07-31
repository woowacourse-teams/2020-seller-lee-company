/**
 * @author begaonnuri
 */

package sellerlee.back.article.application;

import static java.util.stream.Collectors.*;

import java.util.List;

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.Category;
import sellerlee.back.article.domain.Tag;

public class FeedResponse {
    private Long id;
    private Long authorId;
    private String title;
    private Category category;
    private Long price;
    private String contents;
    private List<Tag> tags;

    private FeedResponse() {
    }

    public FeedResponse(Long id, Long authorId, String title,
            Category category, Long price, String contents,
            List<Tag> tags) {
        this.id = id;
        this.authorId = authorId;
        this.title = title;
        this.category = category;
        this.price = price;
        this.contents = contents;
        this.tags = tags;
    }

    public static FeedResponse of(Article article) {
        return new FeedResponse(article.getId(),
                article.getAuthor().getId(),
                article.getTitle(),
                article.getCategory(),
                article.getPrice(),
                article.getContents(),
                article.getTags().toList());
    }

    public static List<FeedResponse> listOf(List<Article> articles) {
        return articles.stream()
                .map(FeedResponse::of)
                .collect(toList());
    }

    public Long getId() {
        return id;
    }

    public Long getAuthorId() {
        return authorId;
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
