/**
 * @author kouz95
 */

package sellerlee.back.article.presentation;

import sellerlee.back.article.domain.Article;

import java.util.List;

import static java.util.stream.Collectors.toList;

public class ArticleResponse {
    private Long id;

    public ArticleResponse() {
    }

    public ArticleResponse(Long id) {
        this.id = id;
    }

    public static ArticleResponse of(Article article) {
        return new ArticleResponse(article.getId());
    }

    public static List<ArticleResponse> listOf(List<Article> articles) {
        return articles.stream()
                .map(ArticleResponse::of)
                .collect(toList());
    }

    public Long getId() {
        return id;
    }
}
