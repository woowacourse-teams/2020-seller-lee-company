/**
 * @author kouz95
 */

package sellerlee.back.article.presentation;

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.Tag;

import java.util.List;

import static java.util.stream.Collectors.toList;

public class ArticleResponse {
    private Long id;

    private String title;

    private String contents;

    private List<Tag> tags;

    private ArticleResponse() {
    }

    public ArticleResponse(Long id, String title, String contents, List<Tag> tags) {
        this.id = id;
        this.title = title;
        this.contents = contents;
        this.tags = tags;
    }

    public static ArticleResponse of(Article article) {
        return new ArticleResponse(article.getId(), article.getTitle(), article.getContents(),
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

    public String getContents() {
        return contents;
    }

    public List<Tag> getTags() {
        return tags;
    }
}
